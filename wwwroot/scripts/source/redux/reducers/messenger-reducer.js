import { REDUX_ACTIONS } from "../../../../../constants";
import { Record } from "immutable";

const Messenger = Record({
    contact: null,
    contactId: 0
});

export default (state = new Messenger(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["MESSENGER.SELECT-CONTACT"]: 
            state = state.set("contact", action.contact);
            state = state.set("contactId", action.contact.id);
            return state;
    }
    return state;
};