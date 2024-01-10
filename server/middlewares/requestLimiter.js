export const requestLimiter = (req, res, next) => {
  const requestCounts = {};
  const ip = req.ip;
  const currentTime = Date.now();
  for (let key in requestCounts) {
    if (currentTime - key > process.env.REQUESTS_PER_MINUTE_TIMEFRAME) {
      delete requestCounts[key];
    }
  }
  if (!requestCounts[ip]) {
    requestCounts[ip] = 1;
  } else {
    requestCounts[ip]++;
  }
  if (requestCounts[ip] > process.env.MAX_REQUESTS_PER_MINUTE) {
    return res
      .status(429)
      .json({ message: "Too many requests, please try again later" });
  }
  next();
};
