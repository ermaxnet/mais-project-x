import { CONTACTS_ACTIONS } from "../redux/actions";
import store from "../redux/store";
import Contact from "../../../../models/contact";

export const setContactsList = contacts => {
    if(!contacts || !contacts.length) { return; }
    contacts = contacts.map(contact => new Contact({
        ...contact,
        contact: contact.item
    }));
    store.dispatch(CONTACTS_ACTIONS.SET_CONTACTS_LIST(contacts));
};