import React, { Component } from "react";
import PropTypes from "prop-types";
import MessagesByTime from "../message/messages-on-time";
import MessageIntro from "../message/message-intro";
import { MESSAGE_TYPE } from "../../../../../constants";
import { Scrollbars } from "react-custom-scrollbars";
import Sensor from "../helpers/visibility-sensor";
import { OrderedMap, Record } from "immutable";
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
    }
    onTrackRender({ style, ...props }) {
        return <div {...props} style={{ 
            ...style, right: 0, bottom: 2, top: 2, width: 8 }} className="messages__scroll-track" />;
    }
    onThumbRender(props) {
        return <div {...props} className="messages__scroll-thumb" />;
    }
    onGroupVisibilityChange(isVisible, groupName, setup = false) {
/*         if(setup && this.props.mark.get("needSetup")) {
            
        } */
        if(this.scroll) {
            const currentMark = this.props.mark;
            //console.log(isVisible, groupName, setup);
            //changeMessagesGroupMark(, isVisible, groupName);
            if(!currentMark.get("setup")) {
                return this.checkGroupName(this.groupNames.get(this.groupNames.size - 1));
            }
            const top = currentMark.get("top"),
                oldName = currentMark.get("name"),
                scrollOn = this.scroll.getValues().top;
            const size = this.groupNames.size,
                index = this.groupNames.keyOf(groupName);
            let name = null;
            if(size > 0) {
                const moveOn = top > scrollOn;
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
            }
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
                    case MESSAGE_TYPE.REGULAR:
                    case MESSAGE_TYPE.SYSTEM: {
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
                }
                return (
                    <div className="messages__group" key={index + groupName} data-group-name={groupName}>
                        <mark className="messages__group-name">
                            <span className="messages__group-name-text">{displayDate(groupName)}</span>
                            <Sensor className="messenger__scrollbars" 
                                name={groupName} 
                                onChange={this.onGroupVisibilityChange.bind(this)}
                            />
                        </mark>
                        {items}
                    </div>
                );
            }).toList();
        }
        return (
            <div className="messenger__history">
                <div className="messenger__history-mark">
                    <span>{displayDate(this.props.mark.get("name"))}</span>
                </div>
                <Scrollbars className="messenger__scrollbars" 
                    ref={ref => this.scroll = ref}
                    renderTrackVertical={this.onTrackRender.bind(this)}
                    renderThumbVertical={this.onThumbRender.bind(this)}
                >
                    {list}
                </Scrollbars>
            </div>
        );
    }
};

export default MessengerHistory;