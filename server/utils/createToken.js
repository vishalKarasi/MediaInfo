import jwt from "jsonwebtoken";

export function createToken(type, userId) {
  return jwt.sign(
    { id: userId },
    type === "accessToken"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:
        type === "accessToken"
          ? process.env.ACCESS_TOKEN_EXPIRATION_TIME
          : process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    }
  );
}
