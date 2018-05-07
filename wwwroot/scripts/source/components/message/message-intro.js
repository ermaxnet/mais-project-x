import React from "react";
import PropTypes from "prop-types";
import Message from "../../../../../models/message";
import { Converter } from "showdown";

const MessageIntro = props => {
    const showdown = new Converter({
        emoji: true
    });
    const message = props.message;
    const textHTML = showdown.makeHtml(props.message.text.trim());
    const messageDo = message.isInbox
        ? (
            <span>0 - 1</span>
        )
        : (
            <button className="btn btn-default">
                Отменить
            </button>
        );
    return (
        <article className={`message message_intro ${message.isInbox ? " message_inbox" : ""}`}>
            <div className="message__text">
                <section dangerouslySetInnerHTML={{ __html: textHTML }}></section>
                <div className="message__do">
                    {messageDo}
                </div>
            </div>
            <div className="message__time">
                <time dateTime={message.updatedAt.format()}>
                    {message.updatedAt.format("HH:mm")}
                </time>
            </div>
        </article>
    );
};

MessageIntro.propTypes = {
    message: PropTypes.instanceOf(Message)
};
export default MessageIntro;