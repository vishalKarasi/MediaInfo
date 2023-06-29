import axios from "axios";

export const omdbApi = axios.create({
  baseURL: "http://www.omdbapi.com/",
});

export const jikanApi = axios.create({
  baseURL: "https://api.jikan.moe/v4/anime",
});

export const omdbKey = "8ebb1bf6";
