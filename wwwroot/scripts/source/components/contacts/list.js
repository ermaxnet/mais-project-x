import React from "react";
import PropTypes from "prop-types";
import Contact from "../../../../../models/contact";
import ContactItem from "./contact";
import { groupBy } from "../../functions";

const ContactsList = props => {
    let contacts = props.contacts.sort((contact1, contact2) => {
        return contact1.key.charCodeAt() - contact2.key.charCodeAt();
    });
    contacts = groupBy(contacts, contact => 
        contact.key[0]);
    let content = <span className="contacts-list-empty">Ужас, у вас нет ни одного контакта! Это нужно срочно исправить.</span>;
    if(contacts.size) {
        const alphabet = [];
        for (const [ letter, items ] of contacts) {
            const list = items.map(item => 
                <ContactItem 
                    key={item.id + item.key} 
                    contact={item} 
                    selectedContact={props.selectedContact} 
                    onClick={e => props.onSelect(e, item)}
                />);
            alphabet.push(
                <div key={letter} className="contacts__group">
                    <dt className="contacts__group-key">
                        <span>{letter}</span>
                    </dt>
                    <dd className="contacts__group-items">
                        <ul className="contacts__list">{list}</ul>
                    </dd>
                </div>
            );
        }
        content = (
            <dl className="contacts__groups">
                {alphabet}
            </dl>
        );
    }
    return (
        <div className="contacts">
            {content}
        </div>
    );
};

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.instanceOf(Contact)).isRequired,
    selectedContact: PropTypes.number,
    onSelect: PropTypes.func.isRequired
};

ContactsList.defaultProps = {
    selectedContact: 0
};
export default ContactsList;