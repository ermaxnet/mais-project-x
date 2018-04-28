import React from "react";
import PropTypes from "prop-types";

const BookHeader = props => {
    return (
        <header className="book__header">
            <span>{props.text}</span>
        </header>
    );
};

BookHeader.propTypes = {
    text: PropTypes.string.isRequired
};

export default BookHeader;