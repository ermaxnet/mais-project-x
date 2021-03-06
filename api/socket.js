const         sio = require("socket.io"),
    socketAdapter = require("socket.io-redis"),
         settings = require("./settings.json").jwt,
            redis = require("./settings.json").redis,
   socketPassport = require("./passport/jwt-socket-passport"),
           cookie = require("cookie"),
               Op = require("sequelize").Op;

const { UserAPI } = require("./models/user");
const { 
    Contact,
    ContactAPI 
} = require("./models/contact");
const { 
    Message,
    MessageAPI 
} = require("./models/message");
const {
    SOCKET_EVENTS,
    MESSAGE_TYPE,
    CONTACT_STATUSES_COD
} = require("../constants");

const connect = io => {
    io.of("/mais").on("connection", socket => {
        Promise.all([
            UserAPI.connect(socket.request.user.id, socket.id),
            ContactAPI.getContacts(socket.request.user.id)
        ])
            .then(([ [ { status }, token ], contacts ]) => {
                socket.request.user.status = status;
                socket.request.user.maisToken = token;

                socket.emit(SOCKET_EVENTS["CABINET.USER-CONNECTED"], socket.request.user, contacts);
                socket.broadcast.emit(SOCKET_EVENTS["CABINET.USER-ONLINE"], socket.request.user.id);

                socket.on(SOCKET_EVENTS["MESSENGER.GET-INTRO-MESSAGES"], contactId => {
                    MessageAPI.getPersonalizedMessages(socket.request.user.id, contactId, { type: MESSAGE_TYPE.INTRO })
                        .then(messages => {
                            socket.emit(SOCKET_EVENTS["MESSENGER.SET-INTRO-MESSAGES"], messages);
                        });
                });

                socket.on(SOCKET_EVENTS["MESSENGER.GET-MESSAGES"], contactId => {
                    MessageAPI.getPersonalizedMessages(socket.request.user.id, contactId, { type: MESSAGE_TYPE.REGULAR })
                        .then(messages => {
                            socket.emit(SOCKET_EVENTS["MESSENGER.SET-MESSAGES"], messages);
                        });
                });

                socket.on(SOCKET_EVENTS["CONTACTS.CANCEL-REQUEST-ON-CONTACT"], contactId => {
                    ContactAPI.deleteContact(contactId)
                        .then(() => {
                            socket.emit(SOCKET_EVENTS["CONTACTS.CANCEL-REQUEST-ON-CONTACT-DONE"], contactId);
                            socket.broadcast.emit(SOCKET_EVENTS["CONTACTS.CANCEL-REQUEST-ON-CONTACT-DONE"], contactId);
                        });
                });

                socket.on(SOCKET_EVENTS["CONTACTS.ACCEPT-REQUEST-ON-CONTACT"], contactId => {
                    ContactAPI.updateContact(contactId, { status: CONTACT_STATUSES_COD.ESTABLISHED }, socket.request.user.id)
                        .then(contact => {
                            socket.emit(SOCKET_EVENTS["CONTACTS.ACCEPT-REQUEST-ON-CONTACT-DONE"], contact);
                            socket.broadcast.emit(SOCKET_EVENTS["CONTACTS.ACCEPT-REQUEST-ON-CONTACT-DONE"], contact);
                        });
                });

                socket.on(SOCKET_EVENTS["CONTACTS.REJECT-REQUEST-ON-CONTACT"], contactId => {
                    ContactAPI.deleteContact(contactId)
                        .then(() => {
                            socket.emit(SOCKET_EVENTS["CONTACTS.REJECT-REQUEST-ON-CONTACT-DONE"], contactId);
                            socket.broadcast.emit(SOCKET_EVENTS["CONTACTS.REJECT-REQUEST-ON-CONTACT-DONE"], contactId);
                        });
                });

                socket.on(SOCKET_EVENTS["CONTACTS-SEARCH.START"], key => {
                    ContactAPI.findContacts(socket.request.user.id, {
                        id: { [Op.not]: socket.request.user.id },
                        [Op.or]: [
                            { username: key },
                            { first_name: { [Op.iRegexp]: `${key}` } },
                            { last_name: { [Op.iRegexp]: `${key}` } },
                            { middle_name: { [Op.iRegexp]: `${key}` } }
                        ]
                    }).then(contacts => {
                        socket.emit(SOCKET_EVENTS["CONTACTS-SEARCH.DONE"], contacts);
                    });
                });

                socket.on(SOCKET_EVENTS["CONTACTS.SEND-REQUEST-ON-CONTACT"], (contact, messageText) => {
                    contact = new Contact({
                        ...contact,
                        id: null,
                        settings: {
                            ...contact.settings,
                            status: CONTACT_STATUSES_COD.CREATED
                        },
                        contact: contact.item
                    });
                    ContactAPI.add(contact)
                        .then(contact => {
                            const message = new Message({
                                contactId: contact.contactId,
                                updatedAt: Date.now(),
                                text: messageText,
                                sender: { id: contact.me },
                                receiverId: contact.userId,
                                type: MESSAGE_TYPE.INTRO
                            });
                            return Promise.all([
                                MessageAPI.add(message),
                                Promise.resolve(contact)
                            ]);
                        })
                        .then(([ message, contact ]) => {
                            socket.emit(SOCKET_EVENTS["CONTACTS.SEND-REQUEST-ON-CONTACT-DONE"], contact);
                            return Promise.all([
                                UserAPI.getMaisTokens(contact.userId),
                                ContactAPI.getContactForUser(contact.userId, contact.contactId)
                            ]);
                        }).then(([ tokens, contact ]) => {
                            if(tokens[contact.me]) {
                                socket.broadcast.to(tokens[contact.me]).emit(SOCKET_EVENTS["CONTACTS.SEND-NEW-CONTACT"], contact);
                            }
                        });
                });

                socket.on(SOCKET_EVENTS["MESSENGER.SEND-MESSAGE"], (contact, messageText, messageDate) => {
                    const myMessage = new Message({
                        contactId: contact.contactId,
                        updatedAt: messageDate,
                        text: messageText,
                        sender: socket.request.user,
                        receiverId: contact.userId,
                        type: MESSAGE_TYPE.REGULAR
                    });
                    myMessage.id = MessageAPI.generateRandomId(myMessage.messageHash);
                    socket.emit(SOCKET_EVENTS["MESSENGER.NEW-MESSAGE-FOR-CONTACT"], myMessage);
                    MessageAPI.add(myMessage)
                        .then(() => {
                            return UserAPI.getMaisTokens(myMessage.receiverId);
                        })
                        .then(tokens => {
                            if(!tokens[myMessage.receiverId]) {
                                return Promise.resolve([ null ]);
                            }
                            return Promise.all([
                                MessageAPI.getPersonalizedMessage(myMessage.receiverId, myMessage.id),
                                Promise.resolve(tokens[myMessage.receiverId])
                            ]);
                        })
                        .then(([ message, token ]) => {
                            if(message) {
                                socket.broadcast.to(token).emit(SOCKET_EVENTS["MESSENGER.NEW-MESSAGE-FOR-CONTACT"], message);
                            }
                        });
                });

                socket.on("error", err => {
                    console.error("error");
                });
                socket.on("disconnecting", () => {
                    UserAPI.disconnect(socket.request.user.id, true)
                        .then(() => {
                            socket.broadcast.emit(SOCKET_EVENTS["CABINET.USER-OFFLINE"], socket.request.user.id);
                        });
                });
            });

    });
};

module.exports = server => {
    const io = sio(server, {
        cookie: true,
        transports: [ "websocket", "polling" ]
    });
    io.adapter(socketAdapter({ host: redis.host, port: redis.port }));
    io.use((socket, next) => {
        socket.request.cookies = cookie.parse(socket.handshake.headers.cookie);
        next();
    });
    io.use(socketPassport);
    connect(io);
    return server;
};