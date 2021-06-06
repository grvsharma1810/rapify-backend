const mongoose = require("mongoose");
const Playlist = require("../../models/playlist.model");

const updatePlaylistVideos = async (req, res) => {
	try {
		const playlistId = req.playlistId;
		const playlist = await Playlist.findById(playlistId);
		const playlistVideo = {
			_id: mongoose.Types.ObjectId(),
			videoId: req.body.videoId,
			time: new Date(req.body.time)
		}
		playlist.videos.push(playlistVideo)
		const newPlaylist = await playlist.save();
		res.status(200).json({ video: playlistVideo })
	} catch (err) {
		res.status(500).json({ success: false, message: "unable to find playlist video", errorMessage: err.message })
	}
}

module.exports = updatePlaylistVideos