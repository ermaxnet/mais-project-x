import { REDUX_ACTIONS } from "../../../../../constants";
import { Record } from "immutable";

const Cabinet = Record({
    isConnected: false,
    user: null
});

export default (state = new Cabinet(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CABINET.USER-CONNECT"]: {
            return state.set("isConnected", true);
        }
        case REDUX_ACTIONS["CABINET.USER-ADD"]: {
            return state.set("user", action.user);
        }
    };
    return state;
};