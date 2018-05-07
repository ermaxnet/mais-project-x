const SCHEMA = require("../../constants").SCHEMAS.MESSAGES;
const { MESSAGE_TYPE } = require("../../../constants");
const Message = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.STRING(128), primaryKey: true },
        type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: MESSAGE_TYPE.REGULAR },
        text: { type: DataTypes.TEXT, allowNull: false },
        contactId: { type: DataTypes.INTEGER, allowNull: false },
        senderId: { type: DataTypes.INTEGER, allowNull: false },
        receiverId:  { type: DataTypes.INTEGER, allowNull: true },
        groupReceiver: { type: DataTypes.BOOLEAN, defaultValue: false },
        isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
    });
module.exports = Message;