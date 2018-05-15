const moment = require("moment");
const User = require("./user");
const Attachment = require("./attachment");

class Message {
    constructor({ 
        id, 
        updatedAt, 
        text,
        contactId,
        groupReceiver,
        isRead,
        type,
        sender = null,
        senderId = null,
        receiverId = null,
        isInbox = false,
        attachments = null
    }) {
        this.id = id;
        this.type = type;
        this.isInbox = isInbox;
        this.updatedAt = moment(updatedAt);
        this.text = text;
        this.groupReceiver = groupReceiver;
        this.isRead = isRead;
        this.contactId = contactId;
        this.receiverId = receiverId;
        this.setSender(senderId, sender);
        if(attachments) {
            this.attachments = attachments.map(attachment => new Attachment(attachment));
        }
    }
    get senderId() {
        return this.sender ? this.sender.id : null;
    }
    get messageHash() {
        return this.text + this.updatedAt;
    }
    get hash() {
        return `${this.updatedAt.format("HH:mm")}|${this.isInbox}|${this.type}`;
    }
    setSender(senderId, sender) {
        if(sender === null) {
            return this.sender = new User({ id: senderId });
        }
        this.sender = sender instanceof User
            ? sender
            : new User(sender);
    }
    checkSender(id) {
        if(!this.sender) { return true; }
        return this.sender.id !== id;
    }
};

module.exports = Message;