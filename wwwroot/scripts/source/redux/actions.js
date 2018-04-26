import { REDUX_ACTIONS } from "../../../../constants";

export const CABINET_ACTIONS = {
    ADD_USER(user) {
        return {
            type: REDUX_ACTIONS["CABINET.USER-ADD"],
            user
        };
    }
};