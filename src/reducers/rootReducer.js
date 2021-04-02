import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: eventReducer
});