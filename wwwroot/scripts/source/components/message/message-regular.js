import React from "react";
import PropTypes from "prop-types";
import Message from "../../../../../models/message";
import { Converter } from "showdown";
import { MESSAGE_TYPE } from "../../../../../constants";

const MessageRegular = props => {
    const showdown = new Converter({
        emoji: true,
        noHeaderId: true
    });
    const message = props.message;
    const textHTML = showdown.makeHtml(props.message.text.trim());
    return (
        <article className={`message message_intro
            ${message.isInbox ? " message_inbox" : ""}
            ${message.type === MESSAGE_TYPE.SYSTEM ? " message_system" : ""}`
        }>
            <div className="message__text">
                <section dangerouslySetInnerHTML={{ __html: textHTML }}></section>
                {message.type === MESSAGE_TYPE.SYSTEM
                    ? <span className="message__system-label">Сообщение сгенерировано системой</span>
                    : null
                }
            </div>
            <div className="message__time">
                <time dateTime={message.updatedAt.format()}>
                    {message.updatedAt.format("HH:mm")}
                </time>
            </div>
        </article>
    );
};

MessageRegular.propTypes = {
    message: PropTypes.instanceOf(Message)
};
export default MessageRegular;