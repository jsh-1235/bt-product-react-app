import axios from "axios";
import { USER_AUTH, USER_REGISTER, USER_UPDATE, USER_READ, USER_DELETE, USER_LOGIN, USER_LOGOUT } from "./types";
import { SERVER_USER } from "./config";

export function auth() {
  const request = axios.get(`${SERVER_USER}/auth`, { withCredentials: true }).then((response) => {
    return response.data;
  });

  return {
    type: USER_AUTH,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios.post(`${SERVER_USER}/register`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_REGISTER,
    payload: request,
  };
}

export function updateUser(dataToSubmit) {
  const request = axios.post(`${SERVER_USER}/update`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_UPDATE,
    payload: request,
  };
}

export function readUser() {
  const request = axios.get(`${SERVER_USER}`, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_READ,
    payload: request,
  };
}

export function deleteUser(dataToSubmit) {
  const request = axios.post(`${SERVER_USER}/delete`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_DELETE,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${SERVER_USER}/login`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_LOGIN,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`${SERVER_USER}/logout`, { withCredentials: true }).then((response) => response.data);

  return {
    type: USER_LOGOUT,
    payload: request,
  };
}
