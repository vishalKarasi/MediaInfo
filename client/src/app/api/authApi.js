import { publicAxios, cookieAxios } from "./serverApi.js";

export const registerApi = (user) => {
  return publicAxios.post("/auth/register", user);
};

export const loginApi = (user) => {
  return cookieAxios.post("/auth/login", user);
};

export const logoutApi = () => {
  return cookieAxios.post("/auth/logout");
};

export const refreshTokenApi = () => {
  return cookieAxios.get("/auth/refresh");
};
