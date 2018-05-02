import React from "react";
import PropTypes from "prop-types";

const BookHeader = props => {
    return (
        <h3 className="book__header">
            <span>{props.text}</span>
        </h3>
    );
};

BookHeader.propTypes = {
    text: PropTypes.string.isRequired
};

export default BookHeader;