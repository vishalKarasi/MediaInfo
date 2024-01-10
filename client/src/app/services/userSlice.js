import {
  getUserApi,
  deleteUserApi,
  updateUserApi,
  updateWatchlistApi,
} from "@app/api/userApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAnimeById } from "./animeSlice";
import { getMediaById } from "./mediaSlice";
import temp from "../../assets/images/bg.jpg";
import { logout } from "./authSlice";

const initialState = {
  USER: {
    username: null,
    email: null,
    profilePic: null,
    watchlist: [],
  },
  status: "",
  message: "",
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId, { dispatch }) => {
    try {
      const { data } = await getUserApi(userId);
      const watchlist = await Promise.all(
        Object.entries(data.watchlist).map(async ([id, type]) => {
          const { payload } = await dispatch(
            type === "anime" ? getAnimeById(id) : getMediaById(id)
          );
          return type === "anime"
            ? {
                mediaType: type,
                id: payload?.data?.mal_id,
                title: payload?.data?.title,
                poster: payload?.data?.images?.jpg?.large_image_url,
                year: payload?.data?.year,
                rating: payload?.data?.score,
              }
            : {
                mediaType: type,
                id: payload.imdbID,
                title: payload.Title,
                poster: payload.Poster === "N/A" ? temp : payload.Poster,
                year: payload.Year,
                rating: payload.imdbRating,
              };
        })
      );

      data.watchlist = watchlist;
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { dispatch }) => {
    try {
      const { data } = await deleteUserApi(userId);
      dispatch(logout());
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, userData }) => {
    try {
      const { data } = await updateUserApi(userId, userData);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// updateWatchlist logic
export const updateWatchlist = createAsyncThunk(
  "user/updateWatchlist",
  async ({ userId, mediaId, type }, { dispatch, getState }) => {
    try {
      const { data } = await updateWatchlistApi(userId, mediaId, type);
      const user = getState().user.USER;
      const mediaExists = user.watchlist.some((item) => item.id === mediaId);

      if (!mediaExists) {
        const { payload } = await dispatch(
          type === "anime" ? getAnimeById(mediaId) : getMediaById(mediaId)
        );

        const newMedia = {
          mediaType: type,
          id: type === "anime" ? payload?.data?.mal_id : payload.imdbID,
          title: type === "anime" ? payload?.data?.title : payload.Title,
          poster:
            type === "anime"
              ? payload?.data?.images?.jpg?.large_image_url
              : payload.Poster === "N/A"
              ? temp
              : payload.Poster,
          year: type === "anime" ? payload?.data?.year : payload.Year,
          rating: type === "anime" ? payload?.data?.score : payload.imdbRating,
        };

        return {
          newMedia: newMedia,
          message: data.message,
        };
      }

      return {
        id: mediaId,
        message: data.message,
      };
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.USER = payload;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(deleteUser.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.USER.username = payload.user.username;
        state.USER.email = payload.user.email;
        state.USER.profilePic = payload.user.profilePic;
        state.message = payload.message;
        toast.success(state.message);
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      })
      .addCase(updateWatchlist.pending, (state) => {
        state.status = "loading";
      })

      .addCase(updateWatchlist.fulfilled, (state, { payload }) => {
        state.status = "success";
        const { id, newMedia, message } = payload;

        if (newMedia) {
          state.USER.watchlist.push(newMedia);
        } else {
          state.USER.watchlist = state.USER.watchlist.filter(
            (item) => item.id !== id
          );
        }

        state.message = message;
        toast.success(state.message);
      })

      .addCase(updateWatchlist.rejected, (state, { error }) => {
        state.status = "error";
        state.message = error.message;
        toast.error(state.message);
      });
  },
});

export default userSlice.reducer;
