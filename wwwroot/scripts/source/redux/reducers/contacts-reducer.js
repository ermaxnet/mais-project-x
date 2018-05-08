import { REDUX_ACTIONS } from "../../../../../constants";
import { List } from "immutable";

export default (state = List(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CONTACTS.SET-LIST"]: 
            return List(action.contacts);
        case REDUX_ACTIONS["CONTACTS.REMOVE-CONTACT"]: {
            return state.filter(item => item.contactId !== action.contactId);
        }
    }
    return state;
};