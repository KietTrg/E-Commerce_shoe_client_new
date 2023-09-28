import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
    // withCredentials: true,
  });
export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalregister/" + token,
    method: "put",
    // withCredentials: true,
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });
export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });