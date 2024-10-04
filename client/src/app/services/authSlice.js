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
import { sanitiseMedia } from "@app/utility/sanitiseMedia";

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
  async ({ mediaId, type }, { getState, dispatch, rejectWithValue }) => {
    const { id, favorite } = getState()?.auth?.user;

    const updatedFavorite = { ...favorite };
    updatedFavorite[mediaId]
      ? delete updatedFavorite[mediaId]
      : (updatedFavorite[mediaId] = type);

    try {
      const { data } = await updateWatchlistApi(id, mediaId, type);
      let favoriteDataItem;

      if (!favorite[mediaId]) {
        const response =
          type === "anime"
            ? await dispatch(getAnimeById(mediaId))
            : await dispatch(getMediaById(mediaId));

        favoriteDataItem = sanitiseMedia(response.payload, type);
      }

      return {
        message: data.message,
        mediaId,
        updatedFavorite,
        favoriteDataItem,
      };
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
          dispatch(fetchMedia).then((result) =>
            sanitiseMedia(result.payload, type)
          )
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

      // deleteUser
      .addCase(deleteUser.pending, handlePending)
      .addCase(deleteUser.fulfilled, handleFulfilled)
      .addCase(deleteUser.rejected, handleRejected)

      // updateUser
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
        const { message, mediaId, updatedFavorite, favoriteDataItem } = payload;
        state.user.favorite = updatedFavorite;
        if (favoriteDataItem) state.favoriteData.push(favoriteDataItem);
        else {
          state.favoriteData = state.favoriteData.filter(
            (item) => item.id !== mediaId
          );
        }

        localStorage.setItem("user-data", JSON.stringify(state.user));
        toast.success(message);
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
