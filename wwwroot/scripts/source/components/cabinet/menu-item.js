import React from "react";
import PropTypes from "prop-types";
import {
    svgIcon
} from "../../functions";

const MenuItem = props => {
    const icon = svgIcon(props.icon);
    return (
        <li className={`menu-item ${props.className || ""} ${props.isActive ? "menu-item_active" : ""}`} onClick={props.onClick}>
            <svg className="menu-item__icon icon" dangerouslySetInnerHTML={{ __html: icon }}></svg>
        </li>
    );
};

MenuItem.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool
};

MenuItem.defaultProps = {
    isActive: false
};

export default MenuItem;