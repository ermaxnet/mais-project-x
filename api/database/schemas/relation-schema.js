const SCHEMA = require("../../constants").SCHEMAS.RELATIONS;
const Relation = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        contactId: { type: DataTypes.INTEGER, allowNull: false },
        me: { type: DataTypes.INTEGER, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: true },
        groupId: { type: DataTypes.INTEGER, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        isCreator: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
    }, {
        timestamps: false
    });
module.exports = Relation;