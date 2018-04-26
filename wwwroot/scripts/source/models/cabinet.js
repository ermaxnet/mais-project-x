import {
    CABINET_ACTIONS
} from "../redux/actions";
import store from "../redux/store";
import User from "../../../../models/user";

export const updateUser = user => {
    const userModel = new User({ id: user.id });
    store.dispatch(CABINET_ACTIONS.ADD_USER(userModel));
};