const sequelize = require("./sequelize"),
      DataTypes = require("sequelize").DataTypes,
           User = require("./schemas/user-schema")(sequelize, DataTypes),
       Settings = require("./schemas/settings-schema")(sequelize, DataTypes),
      MaisToken = require("./schemas/mais-tokens-schema")(sequelize, DataTypes),
       PzkToken = require("./schemas/pzk-tokens-schema")(sequelize, DataTypes);

User.belongsTo(Settings, { foreignKey: "id", targetKey: "id", as: "Settings" });
User.belongsTo(MaisToken, { foreignKey: "id", targetKey: "id", as: "MaisToken" });
User.belongsTo(PzkToken, { foreignKey: "id", targetKey: "id", as: "PzkToken" });

module.exports = {
    sequelize,
    UserSchema: User,
    SettingsSchema: Settings,
    MaisTokenSchema: MaisToken,
    PzkTokenSchema: PzkToken
};