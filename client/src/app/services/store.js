import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import animeSlice from "./animeSlice.js";
import mediaSlice from "./mediaSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    media: mediaSlice,
    anime: animeSlice,
  },
});
