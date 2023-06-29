import { configureStore } from "@reduxjs/toolkit";
import animeSlice from "./animeSlice";
import showSlice from "./showSlice";

export const store = configureStore({
  reducer: {
    shows: showSlice,
    anime: animeSlice,
  },
});
