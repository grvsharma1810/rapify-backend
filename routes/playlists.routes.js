const express = require("express");
const createPlaylist = require("../controller/playlists/create-playlist");
const deletePlaylistById = require("../controller/playlists/delete-playlist-by-id");
const getPlaylistById = require("../controller/playlists/get-playlist-by-id");
const getUserPlaylists = require("../controller/playlists/get-user-playlists");
const updatePlaylistById = require("../controller/playlists/update-playlist-by-id");

const router = express.Router();

router.get("/",getUserPlaylists);
router.post("/",createPlaylist);
router.get("/:playlistId",getPlaylistById);
router.post("/:playlistId",updatePlaylistById);
router.delete("/:playlistId",deletePlaylistById);

module.exports = router