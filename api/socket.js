const         sio = require("socket.io"),
    socketAdapter = require("socket.io-redis"),
         settings = require("./settings.json").jwt,
            redis = require("./settings.json").redis,
   socketPassport = require("./passport/jwt-socket-passport"),
           cookie = require("cookie");

const { UserAPI } = require("./models/user");
const { ContactAPI } = require("./models/contact");
const {
    SOCKET_EVENTS
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