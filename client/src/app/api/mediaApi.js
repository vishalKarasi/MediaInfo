import { omdbApi } from "./baseApi.js";

export const getMediaByIdApi = (id) => {
  return omdbApi.get("", { params: { i: id, plot: "full" } });
};

export const getMediaApi = (type, searchTerm, year) => {
  return omdbApi.get("", {
    params: {
      s: searchTerm || new Date().getFullYear(),
      type: type,
      y: year,
      page: 1,
    },
  });
};
