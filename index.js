import express from "express";
import cookieParser from "cookie-parser";

import { urlRouter } from "./routes/url.js";
import { connectDB } from "./connect.js";
import { restrictToLoginUserOnly, checkAuth } from "./middleware/auth.js";

import ejs from "ejs";
import path from "path";
import staticRouter from "./routes/staticRouter.js";
import userRouter from "./routes/user.js";
// import { handleRedirectToOriginalUrl } from "./controllers/url.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const port = 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", checkAuth, staticRouter);
app.use("/url", restrictToLoginUserOnly, urlRouter);
app.use("/user", userRouter);

// app.use("/:shortID", handleRedirectToOriginalUrl);

connectDB("mongodb://localhost:27017/URL-Shortener")
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
