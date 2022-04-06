import { USER_AUTH, USER_REGISTER, USER_UPDATE, USER_DELETE, USER_LOGIN, USER_LOGOUT, USER_GET } from "../actions/types";

export default function User(state = {}, action) {
  switch (action.type) {
    case USER_AUTH:
      return { ...state, userData: action.payload };
    case USER_REGISTER:
      return { ...state, payload: action.payload };
    case USER_UPDATE:
      return { ...state, payload: action.payload };
    case USER_DELETE:
      return { ...state, payload: action.payload };
    case USER_LOGIN:
      return { ...state, payload: action.payload };
    case USER_LOGOUT:
      return { ...state };
    case USER_GET:
      console.log(state);
      return { ...state, payload: action.payload };
    default:
      return state;
  }
}
