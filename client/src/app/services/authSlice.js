import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi, registerApi } from "@app/api/authApi.js";
import {
  deleteUserApi,
  updateUserApi,
  updateWatchlistApi,
} from "@app/api/userApi.js";
import { toast } from "react-toastify";
import { getMediaById } from "./mediaSlice";
import { getAnimeById } from "./animeSlice";

const initialState = {
  user: JSON.parse(localStorage.getItem("user-data")) || null,
  favoriteData: [],
  status: "idle",
};

// utility function to create register, login, logout api
const createAuthThunk = (actionName, apiCall) => {
  return createAsyncThunk(actionName, async (user, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(user);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  });
};

export const register = createAuthThunk("auth/register", registerApi);
export const login = createAuthThunk("auth/login", loginApi);
export const logout = createAuthThunk("auth/logout", logoutApi);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { id } = getState()?.auth?.user;
    try {
      const { data } = await deleteUserApi(id);
      dispatch(logout());
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    const { id } = getState()?.auth?.user;
    try {
      const { data } = await updateUserApi(id, userData);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// updateFavorite logic
export const updateFavorite = createAsyncThunk(
  "user/updateFavorite",
  async ({ mediaId, type }, { getState, rejectWithValue }) => {
    const { id } = getState()?.auth?.user;
    try {
      const { data } = await updateWatchlistApi(id, mediaId, type);
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const populateFavorite = createAsyncThunk(
  "user/populateState",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { favorite } = getState()?.auth?.user;
    const watchlistPromises = [];
    try {
      for (const [id, type] of Object.entries(favorite)) {
        const fetchMedia =
          type === "anime" ? getAnimeById(id) : getMediaById(id);

        watchlistPromises.push(
          dispatch(fetchMedia).then((result) => {
            if (type === "anime") {
              return {
                mediaType: type,
                id: result.payload.data.mal_id,
                title: result.payload.data.title,
                poster: result.payload.data.images.jpg.large_image_url,
                year: result.payload.data.year,
                rating: result.payload.data.score,
              };
            } else {
              return {
                mediaType: type,
                id: result.payload.imdbID,
                title: result.payload.Title,
                poster:
                  result.payload.Poster === "N/A"
                    ? temp
                    : result.payload.Poster,
                year: result.payload.Year,
                rating: result.payload.imdbRating,
              };
            }
          })
        );
      }

      const data = await Promise.all(watchlistPromises);
      return { data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

const handlePending = (state) => {
  state.status = "loading";
};

const handleFulfilled = (state, { payload }) => {
  state.status = "success";
  toast.success(payload.message);
};

const handleRejected = (state, { payload }) => {
  state.status = "error";
  toast.error(payload);
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(register.rejected, handleRejected)

      // login
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload.user;
        localStorage.setItem("user-data", JSON.stringify(state.user));
        toast.success(payload.message);
      })

      // logout
      .addCase(login.rejected, handleRejected)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.status = "success";
        localStorage.removeItem("user-data");
        state.user = initialState.user;
        toast.success(payload.message);
      })
      .addCase(logout.rejected, handleRejected)

      // delete
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, handleFulfilled)
      .addCase(deleteUser.rejected, handleRejected)

      // update
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = { ...state.user, ...payload.user };
        localStorage.setItem("user-data", JSON.stringify(state.user));
        toast.success(payload.message);
      })
      .addCase(updateUser.rejected, handleRejected)

      // updateFavorite
      .addCase(updateFavorite.pending, handlePending)
      .addCase(updateFavorite.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user.favorite = payload.favorite;
        localStorage.setItem("user-data", JSON.stringify(state.user));
        toast.success(payload.message);
      })
      .addCase(updateFavorite.rejected, handleRejected)

      // populateFavorite
      .addCase(populateFavorite.pending, handlePending)
      .addCase(populateFavorite.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.favoriteData = payload.data;
        toast.success(payload.message);
      })
      .addCase(populateFavorite.rejected, handleRejected);
  },
});

export default authSlice.reducer;
