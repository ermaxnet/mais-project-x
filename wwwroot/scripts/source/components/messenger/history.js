import React, { Component } from "react";
import PropTypes from "prop-types";
import MessagesByTime from "../message/messages-on-time";
import MessageIntro from "../message/message-intro";
import { 
    MESSAGE_TYPE,
    BROWSER_CUSTOM_EVENTS
} from "../../../../../constants";
import { Scrollbars } from "react-custom-scrollbars";
import Sensor from "../helpers/visibility-sensor";
import { OrderedMap, Record, List } from "immutable";
import { displayDate } from "../../functions";
import {
    changeMessagesGroupMark
} from "../../models/messenger";

class MessengerHistory extends Component {
    static propTypes = {
        messages: PropTypes.instanceOf(OrderedMap).isRequired,
        type: PropTypes.number.isRequired,
        mark: PropTypes.instanceOf(Record)
    }
    get groupNames() {
        return this.props.messages.keySeq();
    }
    componentDidMount() {
        this.scroll.scrollToBottom();
        document.body.addEventListener(BROWSER_CUSTOM_EVENTS["MOVE-MESSAGES-SCROLL-TO-BOTTOM"], () => {
            this.scroll.scrollToBottom();
        });
    }
    onTrackRender({ style, ...props }) {
        return <div {...props} style={{ 
            ...style, right: 0, bottom: 2, top: 2, width: 8 }} className="scroll__track" />;
    }
    onThumbRender(props) {
        return <div {...props} className="scroll__track--thumb" />;
    }
    onViewRender({ style, ...props }) {
        const customStyles = this.props.type === MESSAGE_TYPE.SYSTEM || this.props.type === MESSAGE_TYPE.INTRO
            ? {
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end"
            }
            : {

            };
        return <div {...props} style={{ ...style, ...customStyles }} className="scroll__container" />;
    }
    onGroupVisibilityChange(isVisible, groupName) {
        if(this.scroll) {
            const currentMark = this.props.mark;
            const setup = currentMark.get("setup");
            const top = currentMark.get("top"),
                oldName = currentMark.get("name"),
                scrollOn = this.scroll.getValues().top;
            const size = this.groupNames.size,
                index = this.groupNames.keyOf(groupName);
            let name = null;
            const moveOn = top > scrollOn;
            switch(true) {
                case size === 1 && !setup: {
                    name = isVisible ? null : groupName;
                    break;
                }
                case size > 1: {
                    if(setup) {
                        if(moveOn) {
                            if(isVisible && index === 0) {
                                name = null;
                            } else {
                                name = this.groupNames.get(index - 1) || null;
                            }
                        } else {
                            if(isVisible) {
                                name = this.groupNames.get(index - 1) || null;
                            } else {
                                name = this.groupNames.get(index);
                            }
                        }
                    } else {
                        name = isVisible ? this.groupNames.get(size - 2) : this.groupNames.get(size - 1);
                    }
                    break;
                }
            };
            if(oldName !== name) {
                this.checkGroupName(name, scrollOn);
            }
        }
    }
    checkGroupName(name, top = 1) {
        changeMessagesGroupMark(name, top);
    }
    render() {
        let messages = this.props.messages;
        let list = null;
        if(messages.size === 0) {
            list = <span>Ваша история переписки с этим контактом пуста. Срочно напишите здесь о погоде!</span>;
        } else {
            list = messages.map((messagesList, groupName, index) => {
                let items = null;
                switch(this.props.type) {
                    case MESSAGE_TYPE.INTRO: {
                        items = <MessageIntro message={messagesList.get(0)} />
                        break;
                    }
                    case MESSAGE_TYPE.REGULAR: {
                        items = messagesList.map((timesMessagesList, options, index) => {
                            const [
                                time,
                                isInbox,
                                type
                            ] = options.split("|");
                            return (
                                <MessagesByTime 
                                    key={groupName + options} 
                                    messages={timesMessagesList} 
                                    date={groupName}
                                    time={time} 
                                    isInbox={isInbox === "true"}
                                    type={+type}
                                />
                            );
                        }).toList();
                        break;
                    }
                    case MESSAGE_TYPE.SYSTEM: {
                        items = <MessagesByTime 
                            key={groupName + "system"} 
                            messages={List([ messagesList ])} 
                            date={groupName}
                            time={messagesList.updatedAt.format("HH:mm")} 
                            isInbox={messagesList.isInbox}
                            type={messagesList.type}
                        />;
                        break;
                    }
                }
                return (
                    <div className="messages__group" key={index + groupName} data-group-name={groupName}>
                        {this.props.type !== MESSAGE_TYPE.SYSTEM
                            ? (
                                <mark className="messages__group-name">
                                    <span className="messages__group-name-text">{displayDate(groupName)}</span>
                                    <Sensor className="scroll--messages" 
                                        name={groupName} 
                                        onChange={this.onGroupVisibilityChange.bind(this)}
                                    />
                                </mark>
                            )
                            : null
                        }
                        {items}
                    </div>
                );
            }).toList();
        }
        return (
            <div className="messenger__history">
                {this.props.mark && this.props.mark.get("name")
                    ? (
                        <div className="messenger__history-mark">
                            <span>{displayDate(this.props.mark.get("name"))}</span>
                        </div>
                    )
                    : null
                }
                <Scrollbars className="scroll scroll--messages" 
                    ref={ref => this.scroll = ref}
                    renderTrackVertical={this.onTrackRender.bind(this)}
                    renderThumbVertical={this.onThumbRender.bind(this)}
                    renderView={this.onViewRender.bind(this)}
                >
                    {list}
                </Scrollbars>
            </div>
        );
    }
};

export default MessengerHistory;