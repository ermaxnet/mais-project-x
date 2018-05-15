import { 
    CONTACTS_ACTIONS, 
    CONTACTS_SEARCH_ACTIONS 
} from "../redux/actions";
import store from "../redux/store";
import Contact from "../../../../models/contact";
import {
    removeContact as removeContactMessenger,
    clearMessenger,
    selectContact
} from "./messenger";
import { emit } from "../socket";
import { 
    SOCKET_EVENTS,
    CONTACT_STATUSES_COD,
    STATUSES_COD
} from "../../../../constants";
import {
    showContactsBook
} from "./cabinet";

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

export const rejectRequestOnContact = contactId => {
    emit(SOCKET_EVENTS["CONTACTS.REJECT-REQUEST-ON-CONTACT"], contactId);
};

export const rejectRequestOnContactDone = contactId => {
    removeContact(contactId);
    removeContactMessenger(contactId);
};

export const acceptRequestOnContact = contactId => {
    emit(SOCKET_EVENTS["CONTACTS.ACCEPT-REQUEST-ON-CONTACT"], contactId);
};

export const acceptRequestOnContactDone = contact => {
    changeContactStatus(contact.contactId, contact.settings.status);
};

export const removeContact = contactId => {
    store.dispatch(CONTACTS_ACTIONS.REMOVE_CONTACT(contactId));
};

export const changeContactStatus = (contactId, status) => {
    store.dispatch(CONTACTS_ACTIONS.CHANGE_STATUS(contactId, status));
};

export const changeContactsKey = key => {
    store.dispatch(CONTACTS_SEARCH_ACTIONS.CHANGE_KEY(key));
};

export const findContacts = key => {
    emit(SOCKET_EVENTS["CONTACTS-SEARCH.START"], key);
};

export const findContactsDone = contacts => {
    let contactsBook = store.getState().contacts
        .filter(contact => contact.settings.status !== CONTACT_STATUSES_COD.FINDED);
    const maxContact = Math.max.apply(null, contactsBook.map(contact => contact.contactId).toJS());
    const maxContactId = Math.max.apply(null, contactsBook.map(contact => contact.id).toJS());
    const contactsIds = [];
    contacts.forEach((newContact, index) => {
        const contact = contactsBook
            .findLast(contact => contact.settings.secureToken === newContact.settings.secureToken
                || contact.settings.secureToken === newContact.settings.reverseSecureToken);
        if(contact) {
            return contactsIds.push(contact.contactId);
        }
        newContact.contactId = maxContact + 1 + index;
        newContact.id = maxContactId + 2 + index;
        newContact.settings.id = newContact.contactId;
        contactsBook = contactsBook.push(new Contact({
            ...newContact,
            contact: newContact.item
        }));
        contactsIds.push(newContact.contactId);
    });
    clearMessenger();
    store.dispatch(CONTACTS_ACTIONS.SET_CONTACTS_LIST(contactsBook.toJS()));
    store.dispatch(CONTACTS_SEARCH_ACTIONS.SET_CONTACTS_LIST(contactsIds));
};

export const sendRequestOnContact = messageText => {
    const state = store.getState();
    const activeContactId = state.messenger.get("activeContactId");
    const contact = state.contacts.findLast(contact => contact.contactId === activeContactId);
    emit(SOCKET_EVENTS["CONTACTS.SEND-REQUEST-ON-CONTACT"], contact, messageText);
    clearMessenger();
};

export const sendRequestOnContactDone = contact => {
    contact = new Contact({
        ...contact,
        contact: contact.item
    });
    clearSearch();
    store.dispatch(CONTACTS_ACTIONS.UPDATE_CONTACT(contact));
    showContactsBook();
    selectContact(contact.contactId, contact.settings.status);
};

export const clearSearch = () => {
    store.dispatch(CONTACTS_SEARCH_ACTIONS.CLEAR_SEARCH());
};

export const pushContactToContactsBook = (contact, isSelect = false) => {
    contact = new Contact({
        ...contact,
        contact: contact.item
    });
    store.dispatch(CONTACTS_ACTIONS.PUSH_CONTACT(contact));
};

export const setOnlineStatus = userId => {
    store.dispatch(CONTACTS_ACTIONS.CHANGE_USER_STATUS(userId, STATUSES_COD.connected));
};

export const setOfflineStatus = userId => {
    store.dispatch(CONTACTS_ACTIONS.CHANGE_USER_STATUS(userId, STATUSES_COD.disconnected));
};