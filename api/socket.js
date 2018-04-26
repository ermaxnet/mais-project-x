const         sio = require("socket.io"),
    socketAdapter = require("socket.io-redis"),
         settings = require("./settings.json").jwt,
            redis = require("./settings.json").redis,
   socketPassport = require("./passport/jwt-socket-passport"),
           cookie = require("cookie");

const { UserAPI } = require("./models/user");

const connect = io => {
    io.of("/mais").on("connection", socket => {
        const user = socket.request.user;
        UserAPI.connect(user.id, socket.id)
            .then(([ , token ]), () => {
                console.log(token);
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