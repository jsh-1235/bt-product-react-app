import { combineReducers } from "redux";
import user from "./user";
import page from "./page";

const reducers = combineReducers({
  user,
  page,
});

export default reducers;
