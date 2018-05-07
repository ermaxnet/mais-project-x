const         sio = require("socket.io"),
    socketAdapter = require("socket.io-redis"),
         settings = require("./settings.json").jwt,
            redis = require("./settings.json").redis,
   socketPassport = require("./passport/jwt-socket-passport"),
           cookie = require("cookie");

const { UserAPI } = require("./models/user");
const { ContactAPI } = require("./models/contact");
const { MessageAPI } = require("./models/message");
const {
    SOCKET_EVENTS,
    MESSAGE_TYPE
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

                socket.on(SOCKET_EVENTS["MESSENGER.GET-INTRO-MESSAGES"], contactId => {
                    MessageAPI.getPersonalizedMessages(socket.request.user.id, contactId, { type: MESSAGE_TYPE.INTRO })
                        .then(messages => {
                            socket.emit(SOCKET_EVENTS["MESSENGER.SET-INTRO-MESSAGES"], messages);
                        });
                });

                socket.on("error", err => {
                    console.error("error");
                });
                socket.on("disconnecting", () => {
                    UserAPI.disconnect(socket.request.user.id, true)
                        .then(() => {
                            // more here...
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