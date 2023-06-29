import { getShowById, getMoviesAll, getSeriesAll } from "@app/api/showApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  MOVIES: [],
  SERIES: [],
  selectedShow: [],
  status: "",
  error: "",
};

export const fetchShowById = createAsyncThunk(
  "fetchShowById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getShowById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(`${error.message}: No result found`);
    }
  }
);

export const fetchMovies = createAsyncThunk(
  "fetchMovies",
  async (term, { rejectWithValue }) => {
    try {
      const response = await getMoviesAll(term);
      return response.data;
    } catch (error) {
      return rejectWithValue(`${error.message}: Error fetching Show`);
    }
  }
);

export const fetchSeries = createAsyncThunk(
  "fetchSeries",
  async (term, { rejectWithValue }) => {
    try {
      const response = await getSeriesAll(term);
      return response.data;
    } catch (error) {
      return rejectWithValue(`${error.message}: Error fetching Show`);
    }
  }
);

export const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {
    removeSelectedShow: (state) => {
      state.selectedShow = [];
    },
  },
  extraReducers: (builder) => {
    builder

      //fetch Movie by id
      .addCase(fetchShowById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShowById.fulfilled, (state, action) => {
        state.status = "success";
        state.selectedShow = action.payload;
      })
      .addCase(fetchShowById.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // fetch all Movies
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.MOVIES = action.payload.Search;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      // fetch all series
      .addCase(fetchSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = "success";
        state.SERIES = action.payload.Search;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export const { removeSelectedShow } = showSlice.actions;
export default showSlice.reducer;
