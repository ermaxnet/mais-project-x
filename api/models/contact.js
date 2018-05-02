const {
    ContactSchema,
    RelationSchema,
    UserSchema
} = require("../database");
const Contact = require("../../models/contact");
const { 
    UserAssociations,
    UserAPI 
} = require("./user");
const Op = require("sequelize").Op;

const associations = [
    {
        model: ContactSchema,
        as: "settings"
    },
    {
        model: UserSchema,
        as: "contact",
        include: UserAssociations
    }
];

const checkType = contact => {
    if(contact instanceof Contact) { return; }
    throw new TypeError("Contact");
};

const add = contact => checkToken(contact)
    .then(isDone => {
        if(!isDone) {
            return Promise.reject("Contact already exist");
        }
        let secureToken = null;
        if(contact.userId) {
            secureToken = `${contact.me}-${contact.userId}`;
        }
        const build = ContactSchema.build({
            type: contact.type,
            status: contact.status,
            secureToken
        });
        return build.save();
    })
    .then(contactDTO => {
        const tasks = [
            Promise.resolve(contactDTO),
            RelationSchema.create({
                contactId: contactDTO.id,
                me: contact.me,
                userId: contact.userId,
                groupId: contact.groupId,
                isCreator: true
            })
        ];
        if(contact.userId) {
            tasks.push(UserAPI.find.byId(contact.userId));
            tasks.push(
                RelationSchema.create({
                    contactId: contactDTO.id,
                    me: contact.userId,
                    userId: contact.me,
                    isCreator: false
                })
            );
        }
        return Promise.all(tasks);
    })
    .then(([ contactDTO, relationDTO, user ]) => 
        new Contact({
            ...relationDTO.dataValues,
            settings: contactDTO,
            contact: user
        }));

const checkToken = contact => {
    checkType(contact);
    if(!contact.userId) {
        return Promise.resolve(true);
    }
    return ContactSchema.findOne({
        where: {
            [Op.or]: [
                { secureToken: `${contact.me}-${contact.userId}` },
                { secureToken: `${contact.userId}-${contact.me}` }
            ]
        }
    }).then(result => result ? false : true);
};

const getContacts = userId =>
    RelationSchema.findAll({
        where: {
            me: userId
        },
        include: associations
    })
    .then(contacts => contacts 
        ? contacts.map(contactDTO => new Contact(contactDTO)) : []);

module.exports = {
    Contact,
    ContactAssociations: associations,
    ContactAPI: {
        add,
        checkToken,
        getContacts
    }
};