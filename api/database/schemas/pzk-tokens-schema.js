const SCHEMA = require("../../constants").SCHEMAS.PZK_TOKENS;
const PzkTokens = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
        token: { type: DataTypes.STRING, allowNull: true, unique: true }
    });
module.exports = PzkTokens;