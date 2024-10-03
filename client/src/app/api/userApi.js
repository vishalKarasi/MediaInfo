import axios from "axios";

const userApi = axios.create({
  baseURL: "/api/user",
});

export const deleteUserApi = (userId) => {
  return userApi.delete(`/${userId}`);
};

export const updateUserApi = (userId, userData) => {
  return userApi.patch(`/${userId}`, userData);
};

export const updateWatchlistApi = (userId, mediaId, type) => {
  return userApi.patch(`/${userId}/${mediaId}`, { type });
};
