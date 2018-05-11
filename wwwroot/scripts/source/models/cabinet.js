import { CABINET_ACTIONS } from "../redux/actions";
import store from "../redux/store";
import User from "../../../../models/user";
import {
    clearMessenger
} from "./messenger";

export const addUser = userDTO => {
    const user = new User(userDTO);
    store.dispatch(CABINET_ACTIONS.ADD_USER(user));
    store.dispatch(CABINET_ACTIONS.CONNECT_USER());
};

export const showContactsBook = () => {
    // todo Не знаю, надо ли чистить при переходах. Может и не надо
    /* clearMessenger(); */
    store.dispatch(CABINET_ACTIONS.SHOW_CONTACTS_BOOK());
};

export const showSearchBook = () => {
    /* clearMessenger(); */
    store.dispatch(CABINET_ACTIONS.SHOW_SEARCH_BOOK());
};

export { User };