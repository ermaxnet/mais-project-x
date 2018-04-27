import React from "react";
import PropTypes from "prop-types";
import { STATUSES } from "../../../../../constants";

const Avatar = props => {
    return (
        <div className={`avatar ${props.className} status-${STATUSES[props.status]}`}>
            <img className="avatar__image" src={props.source} alt={props.alt || "no"} />
            <span className="avatar__status"></span>
        </div>
    );
};

Avatar.propTypes = {
    source: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired
};

export default Avatar;