const sequelize = require("./sequelize"),
      DataTypes = require("sequelize").DataTypes,
           User = require("./schemas/user-schema")(sequelize, DataTypes),
       Settings = require("./schemas/settings-schema")(sequelize, DataTypes),
      MaisToken = require("./schemas/mais-tokens-schema")(sequelize, DataTypes),
       PzkToken = require("./schemas/pzk-tokens-schema")(sequelize, DataTypes),
        Contact = require("./schemas/contact-schema")(sequelize, DataTypes),
       Relation = require("./schemas/relation-schema")(sequelize, DataTypes),
        Message = require("./schemas/message-schema")(sequelize, DataTypes),
     Attachment = require("./schemas/attachment-schema")(sequelize, DataTypes);

User.hasOne(Settings, { foreignKey: "id", as: "settings" });
User.hasOne(MaisToken, { foreignKey: "id", as: "maisToken" });
User.hasOne(PzkToken, { foreignKey: "id", as: "pzkToken" });

Contact.hasMany(Relation, { onDelete: "CASCADE" });
Relation.belongsTo(Contact, { foreignKey: "contactId", targetKey: "id", as: "settings" });
Relation.belongsTo(User, { foreignKey: "userId", targetKey: "id", as: "contact" });

Contact.hasMany(Message, { onDelete: "CASCADE" });
Message.belongsTo(Contact, { foreignKey: "contactId", targetKey: "id", as: "contact" });
Message.belongsTo(User, { foreignKey: "senderId", targetKey: "id", as: "sender" });
Message.hasMany(Attachment, { foreignKey: "message_id", targetKey: "id", as: "attachments", onDelete: "CASCADE" });

module.exports = {
    sequelize,
    UserSchema: User,
    SettingsSchema: Settings,
    MaisTokenSchema: MaisToken,
    PzkTokenSchema: PzkToken,
    ContactSchema: Contact,
    RelationSchema: Relation,
    MessageSchema: Message,
    AttachmentSchema: Attachment 
};