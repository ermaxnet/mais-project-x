import { REDUX_ACTIONS } from "../../../../../constants";
import { Record, List } from "immutable";

const findedContactsModel = Record({
    key: "",
    contacts: List()
});

export default (state = new findedContactsModel(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CONTACTS-SEARCH.CHANGE-KEY"]: {
            state = state.set("key", action.key);
            return state;
        }
        case REDUX_ACTIONS["CONTACTS-SEARCH.SET-LIST"]: {
            state = state.set("contacts", List(action.contactsIds));
            return state;
        }
    }
    return state;
};