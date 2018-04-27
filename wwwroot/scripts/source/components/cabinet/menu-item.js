import React from "react";
import PropTypes from "prop-types";

const MenuItem = props => {
    const icon = `
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/icons.svg#${props.icon}"></use>`;
    return (
        <li className={`menu-item ${props.className || ""}`}>
            <svg className="menu-item__icon" dangerouslySetInnerHTML={{ __html: icon }}></svg>
        </li>
    );
};

MenuItem.propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default MenuItem;