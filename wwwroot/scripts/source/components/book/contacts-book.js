import React from "react";
import Contacts from "../contacts/list";
import {
    selectContact
} from "../../models/messenger";
import { Scrollbars } from "react-custom-scrollbars";

const onSelect = (e, contact, selectedContact) => {
    e.preventDefault();
    if(selectedContact === contact.contactId) { return; }
    selectContact(contact.contactId, contact.settings.status);
};

const onTrackRender = ({ style, ...props }) => {
    return <div {...props} style={{ 
        ...style, right: 0, bottom: 2, top: 2, width: 8 }} className="scroll__track" />;
};

const onThumbRender = (props) => {
    return <div {...props} className="scroll__track--thumb" />;
};

const ContactsBook = props => {
    const bookHeight = window.innerHeight - 325;
    return (
        <div className="book__content contacts-book">
            <Scrollbars className="scroll"
                style={{ height: bookHeight }}
                renderTrackVertical={onTrackRender}
                renderThumbVertical={onThumbRender}
            >
                <Contacts 
                    contacts={props.contacts} 
                    selectedContact={props.selectedContact} 
                    onSelect={(e, contact) => onSelect(e, contact, props.selectedContact)}
                />
            </Scrollbars>
        </div>
    );
};

export default ContactsBook;