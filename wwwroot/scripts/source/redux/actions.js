import { REDUX_ACTIONS } from "../../../../constants";

export const CABINET_ACTIONS = {
    ADD_USER(user) {
        return {
            type: REDUX_ACTIONS["CABINET.USER-ADD"],
            user
        };
    },
    CONNECT_USER() {
        return {
            type: REDUX_ACTIONS["CABINET.USER-CONNECT"]
        };
    },
    SHOW_CONTACTS_BOOK() {
        return {
            type: REDUX_ACTIONS["CABINET.CONTACTS-BOOK"]
        };
    },
    SHOW_SEARCH_BOOK() {
        return {
            type: REDUX_ACTIONS["CABINET.SEARCH-BOOK"]
        };
    }
};

export const CONTACTS_ACTIONS = {
    SET_CONTACTS_LIST(contacts) {
        return {
            type: REDUX_ACTIONS["CONTACTS.SET-LIST"],
            contacts
        };
    },
    REMOVE_CONTACT(contactId) {
        return {
            type: REDUX_ACTIONS["CONTACTS.REMOVE-CONTACT"],
            contactId
        };
    },
    CHANGE_STATUS(status) {
        return {
            type: REDUX_ACTIONS["CHANGE-STATUS"],
            contact
        };
    }
};

export const MESSENGER_ACTIONS = {
    SELECT_CONTACT(contactId) {
        return {
            type: REDUX_ACTIONS["MESSENGER.SELECT-CONTACT"],
            contactId
        };
    },
    SET_INTRO_MESSAGES(messages) {
        return {
            type: REDUX_ACTIONS["MESSENGER.SET-INTO-MESSAGES"],
            messages
        }
    },
    REMOVE_CONTACT(contactId) {
        return {
            type: REDUX_ACTIONS["MESSENGER.REMOVE-CONTACT"],
            contactId
        };
    },
    ACCEPT_CONTACT(contact) {
        return {
            type: REDUX_ACTIONS["MESSENGER.ACCEPT-CONTACT"],
            contact
        };
    }
};