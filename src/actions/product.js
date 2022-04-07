import axios from "axios";
import { PRODUCT_CREATE, PRODUCT_UPDATE, PRODUCT_READ, PRODUCT_DELETE } from "./types";
import { SERVER_PRODUCT } from "./config";

export function createProduct(dataToSubmit) {
  const request = axios.post(`${SERVER_PRODUCT}/create`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: PRODUCT_CREATE,
    payload: request,
  };
}

export function updateProduct(dataToSubmit) {
  const request = axios.post(`${SERVER_PRODUCT}/update`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: PRODUCT_UPDATE,
    payload: request,
  };
}

export function readProduct() {
  const request = axios.get(`${SERVER_PRODUCT}`, { withCredentials: true }).then((response) => response.data);

  return {
    type: PRODUCT_READ,
    payload: request,
  };
}

export function deleteProduct(dataToSubmit) {
  const request = axios.post(`${SERVER_PRODUCT}/delete`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: PRODUCT_DELETE,
    payload: request,
  };
}
