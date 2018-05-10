import React from "react";
import Contacts from "../contacts/list";
import {
    selectContact
} from "../../models/messenger";

const onSelect = (e, contact, selectedContact) => {
    e.preventDefault();
    if(selectedContact === contact.contactId) { return; }
    selectContact(contact.contactId, contact.settings.status);
};

const ContactsBook = props => {
    return (
        <div className="book__content contacts-book">
            <Contacts 
                contacts={props.contacts} 
                selectedContact={props.selectedContact} 
                onSelect={(e, contact) => onSelect(e, contact, props.selectedContact)}
            />
        </div>
    );
};

export default ContactsBook;