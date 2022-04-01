import { combineReducers } from "redux";
import user from "./user";
import routers from "./routers";

const reducers = combineReducers({
  user,
  routers,
});

export default reducers;
