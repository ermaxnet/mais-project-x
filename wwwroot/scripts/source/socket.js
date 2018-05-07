import io from "socket.io-client";
import { 
    SOCKET,
    SOCKET_EVENTS
} from "../../../constants";
import {
    addUser
} from "./models/cabinet";
import {
    setContactsList
} from "./models/contacts";
import {
    setIntroMessages
} from "./models/messenger";

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

        socket.on(SOCKET_EVENTS["CABINET.USER-CONNECTED"], (user, contacts) => {
            setContactsList(contacts);
            addUser(user);
        });
        socket.on(SOCKET_EVENTS["MESSENGER.SET-INTRO-MESSAGES"], messages => {
            setIntroMessages(messages);
        });
    });
};

export const emit = (name, ...args) => {
    socket.emit(name, ...args);
};