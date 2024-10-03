import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
dotenv.config();

// import routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

// server
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server runing on Port: ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
