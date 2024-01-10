import { User } from "../models/userModel.js";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const DELETE_PROMISE = promisify(fs.unlink);

// get user by id
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sanitizedUser = {
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      watchlist: user.watchlist,
    };

    res.status(200).json(sanitizedUser);
  } catch (error) {
    next(error);
  }
};

// update user

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const prevUser = await User.findById(userId);

    if (!prevUser) return res.status(404).json({ message: "User not found" });

    const imagePath = path.join(process.env.UPLOADS_DIR, prevUser.profilePic);
    await DELETE_PROMISE(imagePath);

    const reqData = {
      ...req.body,
      profilePic: req.file.filename,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: reqData },
      { new: true }
    );

    const user = {
      username: updatedUser.username,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
    };

    res.status(200).json({ message: "Update user profile successfull", user });
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imagePath = path.join(process.env.UPLOADS_DIR, user.profilePic);
    await DELETE_PROMISE(imagePath);

    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Update watchlist
export const updateWatchlist = async (req, res, next) => {
  try {
    const { userId, mediaId } = req.params;
    const { type } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.watchlist.has(mediaId)
      ? user.watchlist.delete(mediaId)
      : user.watchlist.set(mediaId, type);

    const message = user.watchlist.has(mediaId)
      ? "Added to watchlist successfully"
      : "Removed from watchlist successfully";

    await user.save();

    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
