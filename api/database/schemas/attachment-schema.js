const SCHEMA = require("../../constants").SCHEMAS.ATTACHMENTS;
const ATTACHMENT_TYPES = require("../../../constants").ATTACHMENT_TYPES;
const MIME_TYPES = require("../../../constants").MIME_TYPES;
const Attachment = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: ATTACHMENT_TYPES.IMAGE },
        mime_type: { type: DataTypes.STRING(50), defaultValue: MIME_TYPES["text/plain"] },
        file_extension: { type: DataTypes.STRING(5), allowNull: true },
        file_name: { type: DataTypes.STRING(128), allowNull: true },
        file_size: { type: DataTypes.INTEGER, allowNull: true },
        file_content: { type: DataTypes.TEXT, allowNull: true },
        link: { type: DataTypes.STRING, allowNull: true },
        message_id: { type: DataTypes.STRING(128), allowNull: false },
        has_content: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    }, {
        validate: {
            contentOrLinkMustBeExists() {
                if(this.file_content === null && this.link === null) {
                    throw new Error("Для вложения должно быть определено поле 'file_content' или 'link'");
                }
            }
        }
    });
module.exports = Attachment;