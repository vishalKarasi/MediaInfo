import axios from "axios";

const OMDB_KEY = "8ebb1bf6";

export const omdbApi = axios.create({
  baseURL: "https://www.omdbapi.com",
  params: {
    apikey: OMDB_KEY,
  },
});

export const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});
