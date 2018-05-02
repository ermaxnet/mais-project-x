import { REDUX_ACTIONS } from "../../../../../constants";
import { List } from "immutable";

const contacts = List();

export default (state = contacts, action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CONTACTS.SET-LIST"]: 
            return List(action.contacts);
    }
    return state;
};