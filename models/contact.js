const User = require("./user");
const {
    STATUSES_COD,
    CONTACT_TYPES,
    CONTACT_TYPES_COD,
    CONTACT_STATUSES,
    CONTACT_STATUSES_COD
} = require("../constants");

class Contact {
    constructor({ 
        id, 
        me, 
        name, 
        isCreator,
        settings = {}, 
        contact = null 
    }) {
        this.id = id;
        this.contactId = settings.id;
        this.me = me;
        this.name = name;
        this.contact = contact;
        this.isCreator = isCreator;
        this.settings = settings;
        this.message = "В лучшие времена надо будет придумать оптимальный способ получать последние сообщения";
    }
    set contact(contact) {
        switch(contact.constructor) {
            case User:
                this.userId = contact.id;
                this.isGroup = false;
                this.item = contact;
                break;
            default:
                this.userId = contact.id;
                this.isGroup = false;
                this.item = new User(contact);
        }
    }
    get title() {
        return this.name || this.item.full_name;
    }
    get key() {
        return this.item.last_name;
    }
    get status() {
        switch(this.settings.status) {
            case CONTACT_STATUSES_COD.ESTABLISHED:
            case CONTACT_STATUSES_COD.BLOCKED:
                return this.item.status;
            case CONTACT_STATUSES_COD.CREATED:
            default:
                return STATUSES_COD.hidden;
        }
    }
    get type() {
        return this.settings.type;
    }
    get noty() {
        switch(this.settings.status) {
            case CONTACT_STATUSES_COD.CREATED:
                return this.isCreator
                    ? "Вы отправили запрос на добавление в контакты этому пользователю"
                    : "Этот пользователь хочет установить с вами контакт";
            case CONTACT_STATUSES_COD.BLOCKED:
                return "Этот контакт заблокирован";
            case CONTACT_STATUSES_COD.ESTABLISHED:
                return this.message;
            default:
                return null;
        }
    }
    get notyIcon() {
        switch(this.settings.status) {
            case CONTACT_STATUSES_COD.CREATED:
                return this.isCreator ? "send" : "inbox";
            case CONTACT_STATUSES_COD.BLOCKED:
                return "lock";
            case CONTACT_STATUSES_COD.ESTABLISHED:    
            default:
                return null;
        }
    }
};

module.exports = Contact;