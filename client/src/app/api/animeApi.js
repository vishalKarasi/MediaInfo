import { jikanApi } from "./baseApi.js";

export const getAnimeByIdApi = (id) => {
  return jikanApi.get(`/anime/${id}`);
};

export const getAnimeBySearchtermApi = (searchTerm) => {
  return jikanApi.get(`/anime?q=${searchTerm}`);
};

export const getSeasonalAnimeApi = (year, season) => {
  return season
    ? jikanApi.get(`/seasons/${year}/${season}`)
    : jikanApi.get("/seasons/now");
};
