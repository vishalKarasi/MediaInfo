import { User } from "../models/userModel.js";
import path from "path";
import {
  cloudinaryUploader,
  handleCloudinaryUpload,
} from "../middlewares/cloudinary.js";

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
    let newUser = { ...req.body };

    const prevUser = await User.findById(userId);

    if (req.file) {
      newUser.profilePic = await handleCloudinaryUpload(req.file.buffer);
      if (prevUser.profilePic) {
        await cloudinaryUploader.destroy(prevUser.profilePic);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

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
    const prevUser = await User.findById(userId);

    if (prevUser.profilePic) {
      await cloudinaryUploader.destroy(prevUser.profilePic);
    }

    await User.findByIdAndDelete(userId);

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
