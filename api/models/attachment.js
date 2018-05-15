const {
    AttachmentSchema
} = require("../database");
const Attachment = require("../../models/attachment");

const checkType = attachment => {
    if(attachment instanceof Attachment) { return; }
    throw new TypeError("Attachment");
};

const checkArray = attachments => {
    if(attachments instanceof Array) {
        attachments.forEach(attachment => {
            return checkType(attachment);
        });
        return;
    }
    throw new Error("attachments must be an array");
};

AttachmentSchema.hook("beforeCreate", attachment => {
    attachment.has_content = !!attachment.file_content;
    return Promise.resolve(attachment);
});

AttachmentSchema.hook("beforeBulkCreate", attachments => {
    attachments = attachments.map(attachment => {
        attachment.has_content = !!attachment.file_content;
        return attachment;
    });
    return Promise.resolve(attachments);
});

const attachOne = attachment => {
    checkType(attachment);
    return AttachmentSchema.create(attachment)
        .then(attachmentDTO => attachmentDTO ? new Attachment(attachmentDTO) : null);
};

const attachMany = attachments => {
    checkArray(attachments);
    return AttachmentSchema.bulkCreate(attachments)
        .then(attachments => 
            attachments ? attachments.map(attachmentDTO => new Attachment(attachmentDTO)) : null);
};

module.exports = {
    Attachment,
    AttachmentAPI: {
        attach: {
            one: attachOne,
            many: attachMany
        }
    }
};