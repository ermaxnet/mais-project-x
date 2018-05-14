import { 
    REDUX_ACTIONS,
    CONTACT_STATUSES_COD
} from "../../../../../constants";
import { Record, List, Map } from "immutable";
import moment from "moment";

const markRecord = Record({
    name: null, 
    top: 0, 
    setup: false
});

const contactRecord = Record({
    id: 0,
    contactStatus: CONTACT_STATUSES_COD.FINDED,
    messages: Map(),
    messagesWasLoaded: false,
    mark: new markRecord()
});

const messengerState = Record({
    activeContact: new contactRecord(),
    activeContactId: 0,
    contacts: Map()
});

const pushMessage = (messages, message) => {
    const dateKey = message.updatedAt.format("DD.MM.YYYY");
    const timeKey = message.hash;
    if(messages.has(dateKey)) {
        const messagesGroup = messages.get(dateKey);
        if(messagesGroup.has(timeKey)) {
            messages = messages.updateIn([ dateKey, timeKey ], list => list.push(message));
        } else {
            messages = messages.update(dateKey, map => map.set(timeKey, List([ message ])));
        }
    } else {
        messages = messages.set(dateKey, Map({ timeKey: List([ message ]) }));
    }
    return messages;
};

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
                    .forEach(message => {
                        state = state.updateIn([ "activeContact", "messages" ], 
                            map => map.set(message.updatedAt.format("DD.MM.YYYY"), List([ message ])));
                    });
                state = state.setIn([ "activeContact", "messagesWasLoaded" ], true);
            }
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.SET-MESSAGES"]: {
            if(action.messages instanceof Array) {
                let messages = List(action.messages
                    .sort((message1, message2) => {
                        const message1Date = moment(message1.updatedAt);
                        const message2Date = moment(message2.updatedAt);
                        return message1Date - message2Date;
                    }));
                messages = messages.groupBy(message => message.updatedAt.format("DD.MM.YYYY")).map(messagesGroup => 
                    messagesGroup.groupBy(message => message.hash));
                state = state.setIn([ "activeContact", "messages" ], messages);
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
            contact = contact.update("messages", messages => pushMessage(messages, message));
            if(state.get("activeContactId") === message.contactId) {
                state = state.set("activeContact", contact);
            }
            state = state.update("contacts", contacts => contacts.set(message.contactId, contact));
            return state;
        }
        case REDUX_ACTIONS["MESSENGER.CHANGE-MESSAGE-GROUP-MARK"]: {
           /*  const top = state.getIn([ "activeContact", "mark", "top" ]),
                oldName = state.getIn([ "activeContact", "mark", "name" ]);
            const list = state.getIn([ "activeContact", "messages" ]).keySeq(),
                size = list.size,
                index = list.keyOf(action.mark);
            let name = null;
            let setup = state.getIn([ "activeContact", "mark", "setup" ]);
            const moveOn = top > action.top;
            switch(true) {
                case size === 1: {
                    name = action.isVisible ? null : action.mark;
                    setup = true;
                    break;
                }
                case size > 1: {
                    if(setup) {
                        if(moveOn) {
                            if(action.isVisible && index === 0) {
                                name = null;
                            } else {
                                name = list.get(index - 1) || null;
                            }
                        } else {
                            if(action.isVisible) {
                                name = list.get(index - 1) || null;
                            } else {
                                name = list.get(index);
                            }
                        }
                    } else {
                        name = action.isVisible ? list.get(size - 2) : list.get(size - 1);
                        setup = true;
                    }
                    break;
                }
                case size <= 1: 
                    return state;
            }
           */
            return state.updateIn([ "activeContact", "mark" ], mark => {
                mark = mark.set("top", action.top).set("name", action.name).set("setup", true);
                return mark;
            }); 
        }
    }
    return state;
};