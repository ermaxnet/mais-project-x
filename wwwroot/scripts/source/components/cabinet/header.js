import React from "react";
import PropTypes from "prop-types";
import { User } from "../../models/cabinet";
import Avatar from "../images/avatar";

const CabinetHeader = props => {
    const user = props.user;
    const image = user.status_pzk
        ? `data:image/jpeg;base64,${user.settings.avatar}`
        : `${user.settings.imagesDir}${user.settings.avatar}`;
    return (
        <header className="user">
            <div className="user__name">
                <div className="user__name-text">
                    <span>{user.displayName}</span>
                </div>
                {/*user.settings.category
                    ? (
                        <div className="user__name-category">
                            <span>{user.settings.category}</span>
                        </div>
                    )
                    : null
                */}
            </div>
            <Avatar className="user__avatar" source={image} status={user.status} alt={user.username} />
        </header>
    );
};

CabinetHeader.propTypes = {
    user: PropTypes.instanceOf(User).isRequired
};

export default CabinetHeader;