import io from "socket.io-client";
import { 
    SOCKET,
    SOCKET_EVENTS
} from "../../../constants";
import {
    addUser
} from "./models/cabinet";
import {
    setContactsList,
    cancelRequestOnContactDone,
    acceptRequestOnContactDone,
    rejectRequestOnContactDone,
    findContactsDone,
    sendRequestOnContactDone,
    pushContactToContactsBook
} from "./models/contacts";
import {
    setIntroMessages,
    getMessagesForContactDone,
    addMessageToContact
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
        socket.on(SOCKET_EVENTS["CONTACTS.CANCEL-REQUEST-ON-CONTACT-DONE"], contactId => {
            cancelRequestOnContactDone(contactId);
        });
        socket.on(SOCKET_EVENTS["CONTACTS.ACCEPT-REQUEST-ON-CONTACT-DONE"], contact => {
            acceptRequestOnContactDone(contact);
        });
        socket.on(SOCKET_EVENTS["CONTACTS.REJECT-REQUEST-ON-CONTACT-DONE"], contact => {
            rejectRequestOnContactDone(contact);
        });
        socket.on(SOCKET_EVENTS["CONTACTS-SEARCH.DONE"], contacts => {
            findContactsDone(contacts);
        });
        socket.on(SOCKET_EVENTS["CONTACTS.SEND-REQUEST-ON-CONTACT-DONE"], contact => {
            sendRequestOnContactDone(contact);
        });
        socket.on(SOCKET_EVENTS["CONTACTS.SEND-NEW-CONTACT"], contact => {
            pushContactToContactsBook(contact);
        });
        socket.on(SOCKET_EVENTS["MESSENGER.SET-MESSAGES"], messages => {
            getMessagesForContactDone(messages);
        });
        socket.on(SOCKET_EVENTS["MESSENGER.NEW-MESSAGE-FOR-CONTACT"], message => {
            addMessageToContact(message);
        });
    });
};

export const emit = (name, ...args) => {
    socket.emit(name, ...args);
};