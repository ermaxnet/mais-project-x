import React from "react";
import PropTypes from "prop-types";
import Message from "../../../../../models/message";
import { Converter } from "showdown";
import {
    cancelRequestOnContact,
    acceptRequestOnContact,
    rejectRequestOnContact
} from "../../models/contacts";

const onCancel = (e, contactId) => {
    e.preventDefault();
    cancelRequestOnContact(contactId);
};

const onReject = (e, contactId) => {
    e.preventDefault();
    rejectRequestOnContact(contactId);
};

const onAgree = (e, contactId) => {
    e.preventDefault();
    acceptRequestOnContact(contactId);
};

const MessageIntro = props => {
    const showdown = new Converter({
        emoji: true,
        noHeaderId: true
    });
    const message = props.message;
    const textHTML = showdown.makeHtml(props.message.text.trim());
    const messageDo = message.isInbox
        ? (
            <>
                <button className="btn btn-primary" onClick={e => onAgree(e, message.contactId)}>
                    Согласиться
                </button>
                <button className="btn btn-default" onClick={e => onReject(e, message.contactId)}>
                    Отклонить
                </button>
            </>
        )
        : (
            <button className="btn btn-default" onClick={e => onCancel(e, message.contactId)}>
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