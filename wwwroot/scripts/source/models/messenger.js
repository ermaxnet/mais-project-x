import { MESSENGER_ACTIONS } from "../redux/actions";
import store from "../redux/store";
import { emit } from "../socket";
import { SOCKET_EVENTS } from "../../../../constants";
import Message from "../../../../models/message";

export const selectContact = (contactId, contactStatus) => {
    store.dispatch(MESSENGER_ACTIONS.SELECT_CONTACT(contactId, contactStatus));
};

export const emitGetIntoMessages = contactId => {
    emit(SOCKET_EVENTS["MESSENGER.GET-INTRO-MESSAGES"], contactId);
};

export const setIntroMessages = messages => {
    messages = messages.map(messageDTO => new Message(messageDTO));
    store.dispatch(MESSENGER_ACTIONS.SET_INTRO_MESSAGES(messages));
};

export const removeContact = contactId => {
    store.dispatch(MESSENGER_ACTIONS.REMOVE_CONTACT(contactId));
};

export const clearMessenger = () => {
    store.dispatch(MESSENGER_ACTIONS.CLEAR());
};

export const getMessagesForContact = contactId => {
    emit(SOCKET_EVENTS["MESSENGER.GET-MESSAGES"], contactId);
};

export const getMessagesForContactDone = messages => {
    messages = messages.map(messageDTO => new Message(messageDTO));
    store.dispatch(MESSENGER_ACTIONS.SET_MESSAGES(messages));
};

export const sendMessage = (messageText, messageDate) => {
    const state = store.getState();
    const contact = state.contacts
        .findLast(contact => contact.contactId === state.messenger.get("activeContactId"));
    emit(SOCKET_EVENTS["MESSENGER.SEND-MESSAGE"], contact, messageText, messageDate);
};

export const addMessageToContact = message => {
    message = new Message(message);
    store.dispatch(MESSENGER_ACTIONS.ADD_MESSAGE_TO_CONTACT(message));
};
