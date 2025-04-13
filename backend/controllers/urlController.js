const shortId = require("shortid");
const Url = require("../models/urlModel");

async function handleGenerateNewShortUrl(req, res) {
    const { url, alias } = req.body;
    console.log("Request body:", req.body);

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "Please provide a URL to shorten.",
        });
    }

    const shortID = alias || shortId();

    // Check if alias (custom short ID) is already taken
    const existing = await Url.findOne({ shortId: shortID });
    if (existing) {
        return res.status(409).json({
            success: false,
            message: "Alias already in use. Try a different one.",
        });
    }

    await Url.create({
        shortId: shortID,
        redirectUrl: url,
        visitHistory: [],
    });

    console.log("Short URL generated:", shortID);
    return res.status(201).json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    console.log("Analytics request for shortId:", shortId);

    const url = await Url.findOne({ shortId });
    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }

    console.log("Total clicks:", url.visitHistory.length);
    return res.status(200).json({
        totalClicks: url.visitHistory.length,
        analytics: url.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};
