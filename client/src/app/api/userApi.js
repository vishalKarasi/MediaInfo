import { privateAxios } from "./serverApi.js";

export const getUserApi = (userId) => {
  return privateAxios.get(`/user/${userId}`);
};

export const deleteUserApi = (userId) => {
  return privateAxios.delete(`/user/${userId}`);
};

export const updateUserApi = (userId, userData) => {
  return privateAxios.patch(`/user/${userId}`, userData);
};

export const updateWatchlistApi = (userId, mediaId, type) => {
  return privateAxios.patch(`/user/${userId}/${mediaId}`, { type });
};
