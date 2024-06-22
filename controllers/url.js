import { nanoid } from "nanoid";
import { Url } from "../models/url.js";

// Controller for generating a new short URL
export async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortId = nanoid(8);
  await Url.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
}

// Controller for redirecting to the original URL
export async function handleRedirectToOriginalUrl(req, res) {
  const { shortID } = req.params;
  try {
    const data = await Url.findOneAndUpdate(
      { shortId: shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (!data) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(data.redirectURL);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleCalculateClicks(req, res) {
  const shortID = req.params.shortID;
  const data = await Url.findOne({ shortId: shortID });

  return res.json({
    originalUrl: data.redirectURL,
    clicks: data.visitHistory.length,
    analytics: data.visitHistory,
  });
}
