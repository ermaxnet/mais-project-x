import React from "react";

const Screen = props => {
    return (
        <div className={`screen${props.className ? ` ${props.className}` : ""}`}>
            <div className="screen__message">
                {props.children}
            </div>
        </div>
    );
};

export default Screen;