import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { createToken } from "../utils/createToken.js";
import { handleCloudinaryUpload } from "../middlewares/cloudinary.js";

// user registration
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already exist" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...req.body,
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

    const accessToken = createToken("accessToken", user._id);
    const refreshToken = createToken("refreshToken", user._id);

    res.cookie("refresh_token", refreshToken, {
      domain: process.env.DOMAIN,
      path: "/",
      maxAge: parseInt(process.env.MAX_AGE, 10),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res
      .status(200)
      .json({ message: "Login successful", userId: user._id, accessToken });
  } catch (error) {
    next(error);
  }
};

// user logout

export const logout = async (req, res, next) => {
  try {
    if (!req.cookies.refresh_token) {
      return res.status(400).json({ message: "Cookie not found" });
    }

    res.clearCookie("refresh_token");

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

// refresh access token
export const refresh = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: "Not logged in" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }

      const accessToken = createToken("accessToken", user.id);

      return res
        .status(200)
        .json({ message: "Refresh successful", userId: user.id, accessToken });
    });
  } catch (error) {
    next(error);
  }
};
