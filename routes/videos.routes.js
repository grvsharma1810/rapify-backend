const express = require("express");
const createVideo = require("../controller/videos/createVideo");
const getVideoById = require("../controller/videos/getVideoById");
const getVideos = require("../controller/videos/getVideos");
const updateVideo = require("../controller/videos/updateVideo");
const authVerify = require("../middlewares/authVerify");

const router = express.Router();

router.get("/", getVideos);
router.post("/", authVerify, createVideo);
router.get("/:videoId", getVideoById);
router.post("/:videoId", updateVideo);

module.exports = router