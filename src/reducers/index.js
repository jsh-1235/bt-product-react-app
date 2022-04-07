import { combineReducers } from "redux";
import user from "./user";
import product from "./product";
import page from "./page";

const reducers = combineReducers({
  user,
  product,
  page,
});

export default reducers;
