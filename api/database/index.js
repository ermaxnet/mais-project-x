const sequelize = require("./sequelize"),
      DataTypes = require("sequelize").DataTypes,
           User = require("./schemas/user-schema")(sequelize, DataTypes),
       Settings = require("./schemas/settings-schema")(sequelize, DataTypes),
      MaisToken = require("./schemas/mais-tokens-schema")(sequelize, DataTypes),
       PzkToken = require("./schemas/pzk-tokens-schema")(sequelize, DataTypes),
        Contact = require("./schemas/contact-schema")(sequelize, DataTypes),
       Relation = require("./schemas/relation-schema")(sequelize, DataTypes);

User.hasOne(Settings, { foreignKey: "id", as: "Settings" });
User.hasOne(MaisToken, { foreignKey: "id", as: "MaisToken" });
User.hasOne(PzkToken, { foreignKey: "id", as: "PzkToken" });

Relation.belongsTo(Contact, { foreignKey: "contactId", targetKey: "id", as: "Settings" });
Relation.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "Contact" });

module.exports = {
    sequelize,
    UserSchema: User,
    SettingsSchema: Settings,
    MaisTokenSchema: MaisToken,
    PzkTokenSchema: PzkToken,
    ContactSchema: Contact,
    RelationSchema: Relation
};