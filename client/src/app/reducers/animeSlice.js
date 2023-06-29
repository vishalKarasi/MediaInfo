import { getAnimeAll, getAnimeById } from "@app/api/animeApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ANIME: [],
  selectedAnime: [],
  status: "",
  error: "",
};

export const fetchAnimeById = createAsyncThunk(
  "fetchAnimeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAnimeById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(`${error.message}: No Anime found`);
    }
  }
);

export const fetchAnime = createAsyncThunk(
  "fetchAnime",
  async (term, { rejectWithValue }) => {
    try {
      const response = await getAnimeAll(term);
      return response.data;
    } catch (error) {
      return rejectWithValue(`${error.message}: Error fetching Anime`);
    }
  }
);

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    removeSelectedAnime: (state) => {
      state.selectedAnime = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch Anime by id
      .addCase(fetchAnimeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.status = "success";
        state.selectedAnime = action.payload.data;
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      //fetch Anime all
      .addCase(fetchAnime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnime.fulfilled, (state, action) => {
        state.status = "success";
        state.ANIME = action.payload.data;
      })
      .addCase(fetchAnime.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { removeSelectedAnime } = animeSlice.actions;
export default animeSlice.reducer;
