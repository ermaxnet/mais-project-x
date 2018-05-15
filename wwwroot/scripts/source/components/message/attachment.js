import React from "react";
import PropTypes from "prop-types";
import Attachment from "../../../../../models/attachment";

const AttachmentBox = props => {
    const attachment = props.attachment;
    return (
        <div className="attachment">
            {attachment.has_content
                ? <span></span>
                : (
                    <img alt={attachment.id} src={attachment.link} />
                )
            }
        </div>
    );
};

AttachmentBox.propTypes = {
    attachment: PropTypes.instanceOf(Attachment).isRequired
};

export default AttachmentBox;