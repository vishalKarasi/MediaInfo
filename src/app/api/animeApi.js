import { jikanApi } from "./mainApi";

export const getAnimeAll = () => {
  return jikanApi.get("", {
    params: {
      filter: "bypopularity",
    },
  });
};
