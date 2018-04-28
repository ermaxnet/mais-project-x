import { REDUX_ACTIONS } from "../../../../constants";

export const CABINET_ACTIONS = {
    ADD_USER(user) {
        return {
            type: REDUX_ACTIONS["CABINET.USER-ADD"],
            user
        };
    },
    CONNECT_USER() {
        return {
            type: REDUX_ACTIONS["CABINET.USER-CONNECT"]
        };
    },
    SHOW_CONTACTS_BOOK() {
        return {
            type: REDUX_ACTIONS["CABINET.CONTACTS-BOOK"]
        };
    },
    SHOW_SEARCH_BOOK() {
        return {
            type: REDUX_ACTIONS["CABINET.SEARCH-BOOK"]
        };
    }
};