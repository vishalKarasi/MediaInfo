import jwt from "jsonwebtoken";

export function createToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRATION_TIME,
  });

  res.cookie("jwt", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
}
