import React from "react";
import { connect } from "react-redux";
import Contacts from "../contacts/list";
import {
    selectContact
} from "../../models/messenger";

const onSelect = (e, contact, selectedContact) => {
    e.preventDefault();
    if(selectedContact === contact.id) { return; }
    selectContact(contact);
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

const mapStateToProps = state => {
    return {
        contacts: state.contacts.toArray(),
        selectedContact: state.messenger.get("contactId")
    };
};
export default connect(mapStateToProps)(ContactsBook);