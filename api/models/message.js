const {
    MessageSchema,
    UserSchema
} = require("../database");
const Message = require("../../models/message");
const {
    UserAssociations,
    UserAPI
} = require("./user");
const Op = require("sequelize").Op;

const         crypto = require("crypto"),
             encrypt = require("../settings.json").encrypt,
    CRYPTO_ALGORITHM = encrypt.algorithm,
          CRYPTO_KEY = encrypt.key,
           CRYPTO_IV = new Buffer.alloc(encrypt.iv)

const encryptMessage = text => {
    const cipher = crypto.createCipheriv(
        CRYPTO_ALGORITHM, CRYPTO_KEY, CRYPTO_IV);
    text = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    return text;
};

const decryptMessage = text => {
    try {
        const decipher = crypto.createDecipheriv(
            CRYPTO_ALGORITHM, CRYPTO_KEY, CRYPTO_IV);
        text = decipher.update(text, "hex", "utf8") + decipher.final("utf8");
        return text;
    } catch(err) {
        return text;
    }
};

const generateRandomId = hashText => {
    const hash = crypto.createHmac("sha512", CRYPTO_KEY);
    hash.update(hashText);
    return hash.digest("hex");
};

const associations = [
    {
        model: UserSchema,
        as: "sender",
        include: [
            UserAssociations[1]
        ]
    }
];

MessageSchema.hook("beforeCreate", message => {
    message.text = encryptMessage(message.text);
    if(!message.id) {
        message.id = generateRandomId(message.text + message.updatedAt);
    }
    return Promise.resolve();
});

MessageSchema.hook("beforeUpdate", message => {
    message.text = encryptMessage(message.text);
    return Promise.resolve();
});

MessageSchema.hook("afterFind", messages => {
    if(typeof messages === "object" && !(messages instanceof Array)) {
        messages.text = decryptMessage(messages.text);
    } else if(messages instanceof Array) {
        messages = messages.map(message => {
            message.text = decryptMessage(message.text);
            return message;
        });
    } 
    return messages;
});

const checkType = message => {
    if(message instanceof Message) { return; }
    throw new TypeError("Message");
};

const add = message => {
    checkType(message);
    const build = MessageSchema.build({
        id: message.id,
        type: message.type,
        text: message.text,
        contactId: message.contactId,
        senderId: message.senderId,
        receiverId: message.receiverId,
        groupReceiver: message.groupReceiver
    });
    return build.save();
};

const getMessages = (contactId, where = {}) => 
    MessageSchema.findAll({
        where: { contactId, ...where },
        include: associations
    }).then(messages => messages 
        ? messages.map(messageDTO => new Message(messageDTO))  
        : []);

const toMessage = (userId, messageDTO) => {
    const message = new Message(messageDTO);
    message.isInbox = message.checkSender(userId);
    return message;
};

const getPersonalizedMessages = (userId, contactId, where = {}) =>
    MessageSchema.findAll({
        where: { contactId, ...where },
        include: associations
    }).then(messages => messages 
        ? messages.map(messageDTO => toMessage(userId, messageDTO))  
        : []);

const updateMessage = (id, message) => {
    checkType(message);
    return MessageSchema.findOne({
        where: { id },
        include: associations
    }).then(messageDTO => {
        return Promise.all([
            Promise.resolve(messageDTO.sender),
            messageDTO.update({
                text: message.text,
                isRead: false
            })
        ]);
    }).then(([ sender, messageDTO ]) => {
        messageDTO.sender = sender;
        messageDTO.text = message.text;
        return new Message(messageDTO);
    });
};

module.exports = {
    Message,
    MessageAssociations: associations,
    MessageAPI: {
        add,
        getMessages,
        getPersonalizedMessages,
        generateRandomId,
        updateMessage
    }
};