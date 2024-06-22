import express from "express";
import {
  handleGenerateNewShortURL,
  handleRedirectToOriginalUrl,
  handleCalculateClicks,
} from "../controllers/url.js";

export const urlRouter = express.Router();

// POST request to create a new short URL
urlRouter.post("/", handleGenerateNewShortURL);

// GET request for analytics (clicks count) based on the shortID
urlRouter.get("/analytics/:shortID", handleCalculateClicks);

// GET request to redirect to the original URL based on the shortID
urlRouter.get("/:shortID", handleRedirectToOriginalUrl);

export default urlRouter;
