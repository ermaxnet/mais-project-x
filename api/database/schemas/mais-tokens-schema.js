const SCHEMA = require("../../constants").SCHEMAS.MAIS_TOKENS;
const MaisTokens = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
        token: { type: DataTypes.STRING, allowNull: true, unique: true }
    });
module.exports = MaisTokens;