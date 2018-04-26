import { REDUX_ACTIONS } from "../../../../../constants";
import { Record } from "immutable";

const Cabinet = Record({
    user: null
});

export default (state = new Cabinet(), action) => {
    switch(action.type) {
        case REDUX_ACTIONS["CABINET.USER-ADD"]: {
            return state.set("user", action.user);
        }
    };
    return state;
};