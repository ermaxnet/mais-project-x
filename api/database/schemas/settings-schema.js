/* 
    Какие поля нужны для настроек. В будущем наверняка тут появятся и другие поля
    общие настройки
        id, imagesDir
    персонализация
        avatar, category, displayName
*/
const SCHEMA = require("../../constants").SCHEMAS.SETTINGS;
const Settings = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: false },
        imagesDir: { type: DataTypes.STRING, allowNull: true },
        avatar: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        displayName: { type: DataTypes.STRING, allowNull: true }
    }, {
        timestamps: false
    });
module.exports = Settings;