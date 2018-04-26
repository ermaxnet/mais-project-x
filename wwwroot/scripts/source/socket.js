import io from "socket.io-client";
import { SOCKET } from "../../../constants";

const socket = io(SOCKET, {
    transports: ["websocket"],
    autoConnect: false
});

export const connect = done => {
    socket.connect();
    socket.on("connect", () => {
        if(typeof done === "function") {
            done();
        }

        // next
    });
};

export const emit = (name, ...args) => {
    socket.emit(name, ...args);
};