const User = require("./user");

class Contact {
    constructor({ 
        id, 
        me, 
        name, 
        Settings: settings = {}, 
        Contact: contact = null 
    }) {
        this.id = id;
        this.contactId = settings.id;
        this.me = me;
        this.name = name;

        if(contact) {
            this.userId = contact.id;
            this.contact = contact;
        }
    }
    set contact(contact) {
        if(contact instanceof User) {
            return this.user = contact;
        }
        this.user = new User(contact);
    }
    get title() {
        if(this.name) {
            return this.name;
        }
        if(this.user) {
            return this.user.full_name;
        }
        return "Контакт 007";
    }
};

module.exports = Contact;