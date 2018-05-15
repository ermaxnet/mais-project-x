import { REDUX_ACTIONS } from "../../../../../constants";
import { List } from "immutable";

export default (state = List(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CONTACTS.SET-LIST"]: 
            return List(action.contacts);
        case REDUX_ACTIONS["CONTACTS.REMOVE-CONTACT"]: {
            return state.filter(item => item.contactId !== action.contactId);
        }
        case REDUX_ACTIONS["CONTACTS.CHANGE-STATUS"]: {
            state = state.map(contact => {
                if(contact.contactId === action.contactId) {
                    contact.settings.status = action.status;
                }
                return contact;
            });
            return state;
        }
        case REDUX_ACTIONS["CONTACTS.UPDATE-CONTACT"]: {
            const updatedContact = action.contact;
            state = state.map(contact => {
                if(contact.settings.secureToken === updatedContact.settings.secureToken) {
                    return updatedContact;
                }
                return contact;
            });
            return state;
        }
        case REDUX_ACTIONS["CONTACTS.PUSH-CONTACT"]: {
            state = state.push(action.contact);
            return state;
        }
        case REDUX_ACTIONS["CONTACTS.CHANGE-USER-STATUS"]: {
            state = state.map(contact => {
                if(contact.userId === action.userId) {
                    contact.item.status = action.statusCod;
                }
                return contact;
            });
            return state;
        }
    }
    return state;
};