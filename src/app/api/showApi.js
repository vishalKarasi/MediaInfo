import { omdbApi, omdbKey } from "./mainApi";

export const getMoviesAll = (term) => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      s: term || "Harry",
      type: "movie",
    },
  });
};

export const getSeriesAll = (term) => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      s: term || "Friends",
      type: "series",
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
