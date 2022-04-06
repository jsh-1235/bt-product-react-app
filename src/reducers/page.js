import { PAGE_LOCATION } from "../actions/types";

export default function Routers(state = {}, action) {
  switch (action.type) {
    case PAGE_LOCATION: {
      return {
        ...state,
        payload: action.payload,
      };
    }
    default:
      return state;
  }
}
