export const errorHandler = (err, req, res, next) => {
  console.error(err);
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof Error) {
    statusCode = err.statusCode || 500;
    message = err.message || "Internal Server Error";
  }

  return res.status(statusCode).json({ message });
};
