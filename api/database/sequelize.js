const Sequelize = require("sequelize"),
       settings = require("../settings.json").database;

const sequelizeInstance = new Sequelize(settings.name, settings.username, settings.password, {
    dialect: "postgres",
    host: settings.host,
    port: settings.port,
    logging: false
});

module.exports = sequelizeInstance;