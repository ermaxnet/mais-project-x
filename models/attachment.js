const {
    ATTACHMENT_TYPES,
    MIME_TYPES
} = require("../constants");

class Attachment {
    constructor({
        id,
        type,
        mime_type,
        file_extension,
        file_name,
        file_size,
        file_content,
        link,
        message_id,
        has_content
    }) {
        this.id = id;
        this.message_id = message_id;
        this.type = type;
        this.mime_type = mime_type;
        this.file_extension = file_extension;
        this.file_name = file_name;
        this.file_size = file_size;
        this.file_content = file_content;
        this.link = link;
        this.has_content = has_content;
    }
};

module.exports = Attachment;