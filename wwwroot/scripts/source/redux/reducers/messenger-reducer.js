import { 
    REDUX_ACTIONS,
    CONTACT_STATUSES_COD
} from "../../../../../constants";
import { Record, List, Map } from "immutable";
import moment from "moment";

const contactRecord = Record({
    id: 0,
    contactStatus: CONTACT_STATUSES_COD.FINDED,
    messages: List(),
    messagesWasLoaded: false
});

const messengerState = Record({
    activeContact: new contactRecord(),
    activeContactId: 0,
    contacts: Map()
});

export default (state = new messengerState(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["MESSENGER.CLEAR"]: {
            state = state
                .set("activeContactId", 0)
                .set("activeContact", new contactRecord())
                .update("contacts", contacts => 
                    contacts.filter(contact => contact.contactStatus !== CONTACT_STATUSES_COD.FINDED));
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.SELECT-CONTACT"]: {
            const contactId = action.contactId;
            const activeContactId = state.get("activeContactId");
            if(activeContactId === contactId) {
                return state;
            }
            if(activeContactId) {
                state = state
                    .update("contacts", 
                        map => map.set(activeContactId, state.get("activeContact")));
            }
            const contacts = state.get("contacts");
            if(contacts.has(contactId)) {
                state = state
                    .set("activeContact", contacts.get(contactId))
                    .set("activeContactId", contactId);
                return state;
            }
            const contact = new contactRecord({
                id: contactId,
                messagesWasLoaded: action.contactStatus === CONTACT_STATUSES_COD.FINDED,
                contactStatus: action.contactStatus
            });
            state = state
                .update("contacts", map => map.set(contactId, contact))
                .set("activeContact", contact)
                .set("activeContactId", contactId);
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.SET-INTO-MESSAGES"]: {
            if(action.messages instanceof Array) {
                action.messages
                    .sort((message1, message2) => {
                        const message1Date = moment(message1.updatedAt);
                        const message2Date = moment(message2.updatedAt);
                        return message1Date - message2Date;
                    })
                    .forEach(message => {
                        state = state.updateIn([ "activeContact", "messages" ], list => list.push(message));
                    });
                state = state.setIn([ "activeContact", "messagesWasLoaded" ], true);
            }
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.SET-MESSAGES"]: {
            if(action.messages instanceof Array) {
                action.messages
                    .sort((message1, message2) => {
                        const message1Date = moment(message1.updatedAt);
                        const message2Date = moment(message2.updatedAt);
                        return message1Date - message2Date;
                    })
                    .forEach(message => {
                        state = state.updateIn([ "activeContact", "messages" ], list => list.push(message));
                    });
                state = state.setIn([ "activeContact", "messagesWasLoaded" ], true);
            }
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.REMOVE-CONTACT"]: {
            state = state
                .set("activeContact", new contactRecord())
                .set("activeContactId", 0)
                .set("contacts", state.get("contacts").filter(item => item.id !== action.contactId));
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.ADD-MESSAGE-TO-CONTACT"]: {
            const message = action.message;
            let contact = state.get("activeContactId") === message.contactId
                ? state.get("activeContact")
                : state.get("contacts").get(message.contactId);
            if(!contact) { return state; }
            contact = contact.update("messages", messages => messages.push(message));
            if(state.get("activeContactId") === message.contactId) {
                state = state.set("activeContact", contact);
            }
            state = state.update("contacts", contacts => contacts.set(message.contactId, contact));
            return state;
        }
    }
    return state;
};