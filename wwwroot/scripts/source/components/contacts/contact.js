import React from "react";
import PropTypes from "prop-types";
import Contact from "../../../../../models/contact";
import ContactImage from "../images/avatar";
import { svgIcon } from "../../functions";

const ContactItem = props => {
    const contact = props.contact;
    const contactItem = contact.item;
    const image = contactItem.status_pzk
        ? `data:image/jpeg;base64,${contactItem.settings.avatar}`
        : `${contactItem.settings.imagesDir}${contactItem.settings.avatar}`;
    const notyIcon = contact.notyIcon 
        ? (
            <svg className="contact__noty-icon icon" 
                dangerouslySetInnerHTML={{ __html: svgIcon(contact.notyIcon) }}>
            </svg>
        )
        : null;
    const isSelected = contact.contactId === props.selectedContact;
    return (
        <li className={`contact${isSelected ? " contact_selected" : ""}`} onClick={props.onClick}>
            <ContactImage className="contact__image" source={image} status={contact.status} alt={contactItem.username} />
            <div className="contact__content">
                <div className="contact__title">
                    <span>{contact.title}</span>
                </div>
                <div className="contact__noty">
                    <span>{contact.noty}</span>
                    {/* notyIcon */}
                </div>
            </div>
        </li>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.instanceOf(Contact).isRequired,
    selectedContact: PropTypes.number,
    onClick: PropTypes.func.isRequired
};
export default ContactItem;