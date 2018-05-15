import React from "react";
import PropTypes from "prop-types";
import { Converter } from "showdown";
import { MESSAGE_TYPE } from "../../../../../constants";
import { List } from "immutable";
import AttachmentBox from "./attachment";

const MessagesByTime = props => {
    const showdown = new Converter({
        emoji: true,
        noHeaderId: true
    });
    const texts = props.messages.map(message => {
        const textHTML = showdown.makeHtml(message.text.trim()); 
        let attachments = null;
        if(message.attachments) {
            attachments = message.attachments.map(attachment => <AttachmentBox key={attachment.id} attachment={attachment} />);
        }
        return (
            <div key={message.id}>
                <section data-id={message.id} dangerouslySetInnerHTML={{ __html: textHTML }}></section>
                {attachments
                    ? (
                        <div className="message__attachments">{attachments}</div>
                    )
                    : null
                }
            </div>
        );
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