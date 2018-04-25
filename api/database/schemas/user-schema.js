/*
    Какие поля нам нужны для пользователя
    личные данные
        id, username, password? (hash), name, email
    другие настройки пользователя и информация о нем будет хранится в профиле-карточке
        settingsId (id)
    статусы
        statusPZK (status_pzk), statusMAIS (status_mais)

    нужны ещё три таблицы - настройки (settings), токены портала и токены чата
*/
const SCHEMA = require("../../constants").SCHEMAS.USERS;
const User = (sequelize, DataTypes) => 
    sequelize.define(SCHEMA, {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        hash: { type: DataTypes.STRING, allowNull: true },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        middle_name: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        status_pzk: { type: DataTypes.INTEGER, allowNull: true },
        status_mais: { type: DataTypes.INTEGER, allowNull: true }
    }, {
        timestamps: false
    });
module.exports = User;