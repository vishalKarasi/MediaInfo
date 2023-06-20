import { jikanApi } from "./mainApi";

export const getAnimeAll = () => {
  return jikanApi.get("", {
    params: {
      filter: "bypopularity",
    },
  });
};

export const getAnimeById = (id) => {
  return jikanApi.get("", {
    params: {
      i: id,
      Plot: "full",
    },
  });
};
