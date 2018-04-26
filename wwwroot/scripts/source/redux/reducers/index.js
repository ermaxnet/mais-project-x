import { combineReducers } from "redux";
import cabinetReducer from "./cabinet-reducer";

export default combineReducers({
    cabinet: cabinetReducer
});