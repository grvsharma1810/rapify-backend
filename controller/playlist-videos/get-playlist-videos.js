const Playlist = require("../../models/playlist.model");

const getPlaylistVideos = async (req, res) => {
	try {
		const playlistId = req.playlistId;
		console.log(playlistId);
		const { videos } = await Playlist.findById(playlistId);
		if (videos) {
			res.status(200).json({videos})
		} else {
			res.status(404).json({message: "No playlist found with this ID" })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: "unable to find playlist video", errorMessage: err.message })
	}
}

module.exports = getPlaylistVideos;