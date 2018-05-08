import { CONTACTS_ACTIONS } from "../redux/actions";
import store from "../redux/store";
import Contact from "../../../../models/contact";
import {
    removeContact as removeContactMessenger
} from "./messenger";
import { emit } from "../socket";
import { SOCKET_EVENTS } from "../../../../constants";

export const setContactsList = contacts => {
    if(!contacts || !contacts.length) { return; }
    contacts = contacts.map(contact => new Contact({
        ...contact,
        contact: contact.item
    }));
    store.dispatch(CONTACTS_ACTIONS.SET_CONTACTS_LIST(contacts));
};

export const cancelRequestOnContact = contactId => {
    emit(SOCKET_EVENTS["CONTACTS.CANCEL-REQUEST-ON-CONTACT"], contactId);
};

export const cancelRequestOnContactDone = contactId => {
    removeContact(contactId);
    removeContactMessenger(contactId);
};

export const acceptRequestOnContact = contactId => {
    emit(SOCKET_EVENTS["CONTACTS.ACCEPT-REQUEST-ON-CONTACT"], contactId);
};

export const acceptRequestOnContactDone = contact => {
    changeContactStatus(contact.settings.status);
};

export const removeContact = contactId => {
    store.dispatch(CONTACTS_ACTIONS.REMOVE_CONTACT(contactId));
};

export const changeContactStatus = status => {
    store.dispatch(CHANGE_STATUS.CHANGE_STATUS(status));
};