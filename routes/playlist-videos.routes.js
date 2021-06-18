const express = require("express");
const deletePlaylistVideo = require("../controller/playlist-videos/delete-playlist-video");
const getPlaylistVideos = require("../controller/playlist-videos/get-playlist-videos");
const updatePlaylistVideos = require("../controller/playlist-videos/update-playlist-videos");

const router = express.Router();

router.get("/", getPlaylistVideos);
router.post("/", updatePlaylistVideos);
router.delete("/:videoId", deletePlaylistVideo);

module.exports = router