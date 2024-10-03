import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  favorite: { type: Object, default: {} },
});

export const User = mongoose.model("User", userSchema);
