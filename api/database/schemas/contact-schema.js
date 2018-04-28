const SCHEMA = require("../../constants").SCHEMAS.CONTACTS;
const CONTACT_TYPES_COD = require("../../../constants").CONTACT_TYPES_COD;
const CONTACT_STATUSES_COD = require("../../../constants").CONTACT_STATUSES_COD;
const Contact = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.INTEGER, allowNull: false, defaultValue: CONTACT_TYPES_COD.DIALOG },
        status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: CONTACT_STATUSES_COD.CREATED },
        secureToken: { type: DataTypes.STRING, allowNull: true, unique: true }
    });
module.exports = Contact;