import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
});

export const registerApi = (user) => {
  return authApi.post("/register", user);
};

export const loginApi = (user) => {
  return authApi.post("/login", user);
};

export const logoutApi = () => {
  return authApi.post("/logout");
};
