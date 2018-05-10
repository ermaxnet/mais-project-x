import { combineReducers } from "redux";
import cabinetReducer from "./cabinet-reducer";
import contactsReducer from "./contacts-reducer";
import messengerReducer from "./messenger-reducer";
import findedContactsReducer from "./finded-contacts-reducer";

export default combineReducers({
    cabinet: cabinetReducer,
    contacts: contactsReducer,
    messenger: messengerReducer,
    findedContacts: findedContactsReducer
});