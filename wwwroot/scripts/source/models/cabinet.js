import {
    CABINET_ACTIONS
} from "../redux/actions";
import store from "../redux/store";
import User from "../../../../models/user";

export const addUser = userDTO => {
    const user = new User({ 
        ...userDTO, 
        Settings: userDTO.settings, 
        MaisToken: userDTO.maisToken, 
        PzkToken: userDTO.pzkToken 
    });
    store.dispatch(CABINET_ACTIONS.ADD_USER(user));
    store.dispatch(CABINET_ACTIONS.CONNECT_USER());
};

export { User };