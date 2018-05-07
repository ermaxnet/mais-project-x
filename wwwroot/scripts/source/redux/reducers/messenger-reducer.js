import { REDUX_ACTIONS } from "../../../../../constants";
import { Record, List } from "immutable";

const Messenger = Record({
    contact: null,
    contactId: 0,
    messages: List()
});

export default (state = new Messenger(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["MESSENGER.SELECT-CONTACT"]: 
            state = state.set("contact", action.contact);
            state = state.set("contactId", action.contact.id);
            return state;
        case REDUX_ACTIONS["MESSENGER.SET-INTO-MESSAGES"]:
            if(!(action.messages instanceof Array)) {
                return state;
            }
            action.messages.forEach(message => {
                state = state.update("messages", list => list.push(message));
            });
            return state;
    }
    return state;
};