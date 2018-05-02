import { MESSENGER_ACTIONS } from "../redux/actions";
import store from "../redux/store";

export const selectContact = contact => {
    store.dispatch(MESSENGER_ACTIONS.SELECT_CONTACT(contact));
};