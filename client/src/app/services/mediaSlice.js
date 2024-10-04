import { getMediaApi, getMediaByIdApi } from "@app/api/mediaApi.js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import temp from "@assets/images/bg.jpg";

const initialState = {
  MEDIA: [],
  selectedMedia: {},
  searchTerm: null,
  year: null,
  status: "idle",
  error: "",
};

export const getMediaById = createAsyncThunk(
  "media/id",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getMediaByIdApi(id);
      return data;
    } catch (error) {
      return rejectWithValue("No result found");
    }
  }
);

export const getMedia = createAsyncThunk(
  "media/searchTerm",
  async ({ type, searchTerm, year }, { rejectWithValue }) => {
    try {
      const { data } = await getMediaApi(type, searchTerm, year);
      const filteredData = data.Search.map((item) => ({
        id: item.imdbID,
        title: item.Title,
        poster: item.Poster === "N/A" ? temp : item.Poster,
        year: item.Year,
      }));

      return filteredData;
    } catch (error) {
      return rejectWithValue("No result found");
    }
  }
);

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    removeSelectedMedia: (state) => {
      state.selectedMedia = {};
    },

    setYear: (state, { payload }) => {
      state.year = payload;
    },

    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
  extraReducers: (builder) => {
    builder

      //get media by id
      .addCase(getMediaById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMediaById.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.selectedMedia = payload;
      })
      .addCase(getMediaById.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload;
      })

      // get media by searchterm
      .addCase(getMedia.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMedia.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.MEDIA = payload;
      })
      .addCase(getMedia.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload;
      });
  },
});

export const { removeSelectedMedia, setYear, setSearchTerm } =
  mediaSlice.actions;
export default mediaSlice.reducer;
