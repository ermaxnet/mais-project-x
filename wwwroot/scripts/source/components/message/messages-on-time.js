import React from "react";
import PropTypes from "prop-types";
import { Converter } from "showdown";
import { MESSAGE_TYPE } from "../../../../../constants";
import { List } from "immutable";

const MessagesByTime = props => {
    const showdown = new Converter({
        emoji: true,
        noHeaderId: true
    });
    const texts = props.messages.map(message => {
        const textHTML = showdown.makeHtml(message.text.trim()); 
        return <section key={message.id} data-id={message.id} dangerouslySetInnerHTML={{ __html: textHTML }}></section>;
    });
    return (
        <article className={`message
            ${props.isInbox ? " message_inbox" : ""}
            ${props.type === MESSAGE_TYPE.SYSTEM ? " message_system" : ""}`
        }>
            <div className="message__text">
                {texts}
                {props.type === MESSAGE_TYPE.SYSTEM
                    ? <span className="message__system-label">Сообщение сгенерировано системой</span>
                    : null
                }
            </div>
            <div className="message__time">
                <time dateTime={`${props.date} ${props.time}`}>{props.time}</time>
            </div>
        </article>
    );
};

MessagesByTime.propTypes = {
    messages: PropTypes.instanceOf(List).isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isInbox: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired
};
export default MessagesByTime;