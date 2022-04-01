import { PAGE_ROUTER } from "../actions/types";

export default function Routers(state = {}, action) {
  switch (action.type) {
    case PAGE_ROUTER: {
      // console.log("PAGE_ROUTER", action.payload);

      return {
        ...state,
        location: action.payload,
      };
    }
    default:
      return state;
  }
}
