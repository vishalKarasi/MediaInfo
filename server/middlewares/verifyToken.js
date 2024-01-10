import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let accessToken = req.header("Authorization");
    if (!accessToken) {
      return res.status(403).json({ message: "Forbiden" });
    }

    if (accessToken.startsWith("Bearer ")) {
      accessToken = accessToken.slice(7).trim();
    }
    const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: "Token expired" });
    }
    next(error);
  }
};
