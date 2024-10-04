import { User } from "../models/userModel.js";
import {
  cloudinaryUploader,
  handleCloudinaryUpload,
} from "../middlewares/cloudinary.js";

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

    const updateUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    res.status(200).json({
      message: "Update user profile successful",
      user: {
        username: updateUser.username,
        email: updateUser.email,
        profilePic: updateUser.profilePic,
      },
    });
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

// Update favorite
export const updateFavorite = async (req, res, next) => {
  try {
    const { userId, mediaId } = req.params;
    const { type } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorite[mediaId]
      ? delete user.favorite[mediaId]
      : (user.favorite[mediaId] = type);

    const message = user.favorite[mediaId]
      ? "Added to favorite successfully"
      : "Removed from favorite successfully";

    user.markModified("favorite");

    await user.save();

    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
