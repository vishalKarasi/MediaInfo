import { jikanApi } from "./mainApi";

export const getAnimeAll = (term) => {
  const params = {};

  if (term) {
    params.q = term;
  } else {
    params.filter = "bypopularity";
  }

  return jikanApi.get("", { params });
};

export const getAnimeById = (id) => {
  return jikanApi.get(`/${id}`);
};
