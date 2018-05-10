import React from "react";
import PropTypes from "prop-types";
import {
    svgIcon
} from "../../functions";

const onSearch = e => {
    e.preventDefault();
};

const SearchBox = props => {
    return (
        <form className="search-box">
            <button type="button" className="button-back" onClick={props.onBack}>
                <svg className="icon" dangerouslySetInnerHTML={{ __html: svgIcon("back") }}></svg>
            </button>
            <input 
                className="search-box__input" 
                type="text" 
                name="contactsKey" 
                id="contactsKey"
                value={props.contactsKey} 
                onChange={props.onFindContacts}
            />
            <button type="submit" className="button-go" onClick={onSearch}>
                <svg className="icon" dangerouslySetInnerHTML={{ __html: svgIcon("search") }}></svg>
            </button>
        </form>
    );
};

SearchBox.propTypes = {
    onBack: PropTypes.func.isRequired,
    onFindContacts: PropTypes.func.isRequired,
    contactsKey: PropTypes.string.isRequired
};

export default SearchBox;