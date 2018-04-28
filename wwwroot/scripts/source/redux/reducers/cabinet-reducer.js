import { REDUX_ACTIONS } from "../../../../../constants";
import { Record } from "immutable";

const Cabinet = Record({
    isConnected: false,
    user: null,
    isContactsBook: false,
    isSearchBook: false
});

export default (state = new Cabinet(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CABINET.USER-CONNECT"]: {
            return state.set("isConnected", true);
        }
        case REDUX_ACTIONS["CABINET.USER-ADD"]: {
            return state.set("user", action.user);
        }
        case REDUX_ACTIONS["CABINET.CONTACTS-BOOK"]: {
            state = state.set("isContactsBook", true);
            state = state.set("isSearchBook", false);
            return state;
        }
        case REDUX_ACTIONS["CABINET.SEARCH-BOOK"]: {
            state = state.set("isContactsBook", false);
            state = state.set("isSearchBook", true);
            return state;
        }
    };
    return state;
};