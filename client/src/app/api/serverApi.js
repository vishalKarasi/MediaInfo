import axios from "axios";
import { store } from "../services/store.js";
import { refreshToken } from "@app/services/authSlice.js";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
console.log(BASE_URL);

export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

export const cookieAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

privateAxios.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const dispatch = store.dispatch;

    if (error?.response?.status === 403) {
      await dispatch(refreshToken());
      const { accessToken } = store.getState().auth;
      const originalRequest = error.config;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return privateAxios(originalRequest);
    }
    return Promise.reject(error);
  }
);
