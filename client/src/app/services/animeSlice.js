import {
  getAnimeByIdApi,
  getAnimeBySearchtermApi,
  getSeasonalAnimeApi,
} from "@app/api/animeApi.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ANIME: [],
  selectedAnime: {},
  year: new Date().getFullYear(),
  season: null,
  status: "",
  error: "",
};

export const getAnimeById = createAsyncThunk(
  "anime/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getAnimeByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue("No result found");
    }
  }
);

export const getAnimeBySearchterm = createAsyncThunk(
  "anime/searchterm",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const { data } = await getAnimeBySearchtermApi(searchTerm);

      if (data.data.length < 1) return rejectWithValue("No result found");

      const filteredData = data.data.map((item) => ({
        id: item.mal_id,
        title: item.title,
        poster: item.images.jpg.large_image_url,
        year: item.year,
        rating: item.score,
      }));

      return filteredData;
    } catch (error) {
      return rejectWithValue("No result found");
    }
  }
);

export const getSeasonalAnime = createAsyncThunk(
  "anime/season",
  async ({ year, season }, { rejectWithValue }) => {
    try {
      const { data } = await getSeasonalAnimeApi(year, season);

      const filteredData = data.data.map((item) => ({
        id: item.mal_id,
        title: item.title,
        poster: item.images.jpg.large_image_url,
        year: item.year,
        rating: item.score,
      }));

      return filteredData;
    } catch (error) {
      return rejectWithValue("No result found");
    }
  }
);

export const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    removeSelectedAnime: (state) => {
      state.selectedAnime = {};
    },

    setAnimeYear: (state, { payload }) => {
      state.year = payload;
    },

    setSeason: (state, { payload }) => {
      state.season = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get anime by id
      .addCase(getAnimeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnimeById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.selectedAnime = payload.data;
      })

      .addCase(getAnimeById.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload;
      })

      //get anime
      .addCase(getAnimeBySearchterm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAnimeBySearchterm.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.ANIME = payload;
      })
      .addCase(getAnimeBySearchterm.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload;
      })

      //get seasonal anime
      .addCase(getSeasonalAnime.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSeasonalAnime.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.ANIME = payload;
      })
      .addCase(getSeasonalAnime.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload;
      });
  },
});

export const { removeSelectedAnime, setAnimeYear, setSeason } =
  animeSlice.actions;
export default animeSlice.reducer;
