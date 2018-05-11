import React from "react";
import PropTypes from "prop-types";
import MessagesByTime from "../message/messages-on-time";
import MessageIntro from "../message/message-intro";
import { MESSAGE_TYPE } from "../../../../../constants";
import { OrderedMap } from "immutable";

const MessengerHistory = props => {
    let messages = props.messages;
    let list = null;
    if(messages.size === 0) {
        list = <span>Ваша история переписки с этим контактом пуста. Срочно напишите здесь о погоде!</span>;
    } else {
        list = messages.map((messagesList, groupName, index) => {
            let items = null;
            switch(props.type) {
                case MESSAGE_TYPE.INTRO: {
                    items = <MessageIntro message={messagesList.get(0)} />
                    break;
                }
                case MESSAGE_TYPE.REGULAR:
                case MESSAGE_TYPE.SYSTEM: {
                    const timeGroups = messagesList.groupBy(message => {
                        return `${message.updatedAt.format("HH:mm")}|${message.isInbox}|${message.type}`;
                    });
                    items = timeGroups.map((timesMessagesList, options, index) => {
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
                <div className="messages__group" key={index + groupName}>
                    <mark className="messages__group-name">{groupName}</mark>
                    {items}
                </div>
            );
        }).toList();
        /* switch(props.type) {
            case MESSAGE_TYPE.INTRO:
                //const introMessage = messages.first();
                list = <MessageIntro message={messages[0]} />;
                break;
            /* case MESSAGE_TYPE.REGULAR:
            case MESSAGE_TYPE.SYSTEM:
                list = messages.map(message => 
                    );
                break; 
        } */
    }
    return (
        <div className="messenger__history">
            {list}
        </div>
    );
};

MessengerHistory.propTypes = {
    messages: PropTypes.instanceOf(OrderedMap).isRequired,
    type: PropTypes.number.isRequired
};
export default MessengerHistory;