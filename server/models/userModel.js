import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  watchlist: { type: Map, of: String, default: new Map() },
});

export const User = mongoose.model("User", userSchema);
