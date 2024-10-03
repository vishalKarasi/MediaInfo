import { User } from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";
import bcrypt from "bcrypt";
import { handleCloudinaryUpload } from "../middlewares/cloudinary.js";

// user registration
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already exist" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      profilePic: await handleCloudinaryUpload(req.file.buffer),
      password: hashPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "Register successful" });
  } catch (error) {
    next(error);
  }
};

// user login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    createToken(user._id, res);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        favorite: user.favorite,
      },
    });
  } catch (error) {
    next(error);
  }
};

// user logout
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
