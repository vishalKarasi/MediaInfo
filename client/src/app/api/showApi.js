import { omdbApi, omdbKey } from "./mainApi";

export const getMoviesAll = (term, year) => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      s: term || "Harry",
      type: "movie",
      y: year || "",
    },
  });
};

export const getSeriesAll = (term, year) => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      s: term || "Friends",
      type: "series",
      y: year || "",
    },
  });
};

export const getShowById = (id) => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      i: id,
      Plot: "full",
    },
  });
};
