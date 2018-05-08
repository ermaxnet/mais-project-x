import { MESSENGER_ACTIONS } from "../redux/actions";
import store from "../redux/store";
import { emit } from "../socket";
import { SOCKET_EVENTS } from "../../../../constants";
import Message from "../../../../models/message";

export const selectContact = contactId => {
    store.dispatch(MESSENGER_ACTIONS.SELECT_CONTACT(contactId));
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