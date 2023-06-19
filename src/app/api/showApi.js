import { omdbApi, omdbKey } from "./mainApi";

export const getMoviesAll = () => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      s: "Harry",
      type: "movie",
    },
  });
};

export const getSeriesAll = () => {
  return omdbApi.get("", {
    params: {
      apiKey: omdbKey,
      s: "Friends",
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
