import axios from "axios";
import { USER_AUTH, USER_REGISTER, USER_UPDATE, USER_DELETE, USER_LOGIN, USER_LOGOUT, USER_GET } from "./types";
import { USER_SERVER } from "./config";

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`, { withCredentials: true }).then((response) => {
    return response.data;
  });

  return {
    type: USER_AUTH,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_REGISTER,
    payload: request,
  };
}

export function updateUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/update`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_UPDATE,
    payload: request,
  };
}

export function deleteUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/delete`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_DELETE,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_LOGIN,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_LOGOUT,
    payload: request,
  };
}

export function getUser() {
  const request = axios.get(`${USER_SERVER}`, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_GET,
    payload: request,
  };
}
