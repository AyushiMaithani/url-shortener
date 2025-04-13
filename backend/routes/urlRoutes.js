const express=require('express');
const { handleGenerateNewShortUrl,handleGetAnalytics } = require('../controllers/urlController');
const router=express.Router();
const Url=require("../models/urlModel");

router.post("/",handleGenerateNewShortUrl);
router.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    console.log("shortId",shortId);
    const url = await Url.findOne({ shortId });
    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }
    url.visitHistory.push({ timestamp: Date.now() });
    await url.save();
    return res.redirect(url.redirectUrl);
})

router.get("/analytics/:shortId",handleGetAnalytics);



module.exports=router;