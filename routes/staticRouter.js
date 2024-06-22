import express from "express";
import Url from "../models/url.js";
const staticRouter = express.Router();
staticRouter.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  const allUrl = await Url.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrl });
});

staticRouter.get("/signup", (req, res) => {
  return res.render("signup");
});
staticRouter.get("/login", (req, res) => {
  return res.render("login");
});
export default staticRouter;
