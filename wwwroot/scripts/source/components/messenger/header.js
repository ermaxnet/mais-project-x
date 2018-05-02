import React from "react";
import PropTypes from "prop-types";
import Contact from "../../../../../models/contact";
import { STATUSES } from "../../../../../constants";

const ContactHeader = props => {
    const contact = props.contact;
    return (
        <header className={`contact-header status-${STATUSES[contact.status]}`}>
            <div className="contact__title">
                <span>{contact.title}</span>
                <span className="contact__status"></span>
            </div>
        </header>
    );
};

ContactHeader.propTypes = {
    contact: PropTypes.instanceOf(Contact).isRequired
};
export default ContactHeader;