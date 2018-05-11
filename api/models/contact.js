const {
    ContactSchema,
    RelationSchema,
    UserSchema,
    MessageSchema
} = require("../database");
const Contact = require("../../models/contact");
const { 
    UserAssociations,
    UserAPI 
} = require("./user");
const Op = require("sequelize").Op;
const {
    CONTACT_TYPES_COD,
    CONTACT_STATUSES_COD
} = require("../../constants");

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
            id: contact.id,
            type: contact.settings.type,
            status: contact.settings.status,
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

const deleteContact = contactId => 
    ContactSchema.destroy({
        where: { id: contactId }
    });

const updateContact = (contactId, contact, userId) => 
    ContactSchema.findById(contactId)
        .then(contactDTO => contactDTO.update(contact))
        .then(() => RelationSchema.findOne({
            where: {
                me: userId,
                contactId
            },
            include: associations
        }))
        .then(contactDTO => contactDTO ? new Contact(contactDTO) : null);

const findContacts = (userId, where) => 
    UserAPI.find.all(where)
        .then(users => users.map(user => new Contact({
            me: userId,
            name: user.displayName,
            isCreator: true,
            settings: {
                type: CONTACT_TYPES_COD.DIALOG,
                status: CONTACT_STATUSES_COD.FINDED,
                secureToken: `${userId}-${user.id}`,
                reverseSecureToken: `${user.id}-${userId}`
            },
            contact: user
        })));

const getContactForUser = (userId, contactId) => 
    RelationSchema.findOne({
        where: {
            me: userId,
            contactId
        },
        include: associations
    }).then(contactDTO => contactDTO ? new Contact(contactDTO) : null);

module.exports = {
    Contact,
    ContactAssociations: associations,
    ContactAPI: {
        add,
        checkToken,
        getContacts,
        deleteContact,
        updateContact,
        findContacts,
        getContactForUser
    }
};