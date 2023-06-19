import { getAnimeAll } from "@app/api/animeApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ANIME: [],
  status: "",
  error: "",
};

export const fetchAnime = createAsyncThunk(
  "fetchAnime",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAnimeAll();
      return response.data;
    } catch (error) {
      return rejectWithValue("Error fetching anime: " + error.message);
    }
  }
);

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.status = "success";
        state.ANIME = action.payload.data;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default animeSlice.reducer;
