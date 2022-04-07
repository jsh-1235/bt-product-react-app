import { PRODUCT_CREATE, PRODUCT_UPDATE, PRODUCT_READ, PRODUCT_DELETE } from "../actions/types";

export default function Product(state = {}, action) {
  switch (action.type) {
    case PRODUCT_CREATE:
      return { ...state, payload: action.payload };
    case PRODUCT_UPDATE:
      return { ...state, payload: action.payload };
    case PRODUCT_READ:
      return { ...state, payload: action.payload };
    case PRODUCT_DELETE:
      return { ...state, payload: action.payload };
    default:
      return state;
  }
}
