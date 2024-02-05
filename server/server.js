import express from "express";
import cors from "cors";
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
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

const __dirname = import.meta.dirname;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use(errorHandler);

// server
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server runing on Port: ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
