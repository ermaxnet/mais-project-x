const sequelize = require("./sequelize"),
      DataTypes = require("sequelize").DataTypes,
           User = require("./schemas/user-schema")(sequelize, DataTypes),
       Settings = require("./schemas/settings-schema")(sequelize, DataTypes),
      MaisToken = require("./schemas/mais-tokens-schema")(sequelize, DataTypes),
       PzkToken = require("./schemas/pzk-tokens-schema")(sequelize, DataTypes);

User.hasOne(Settings, { foreignKey: "id", as: "Settings" });
User.hasOne(MaisToken, { foreignKey: "id", as: "MaisToken" });
User.hasOne(PzkToken, { foreignKey: "id", as: "PzkToken" });

module.exports = {
    sequelize,
    UserSchema: User,
    SettingsSchema: Settings,
    MaisTokenSchema: MaisToken,
    PzkTokenSchema: PzkToken
};