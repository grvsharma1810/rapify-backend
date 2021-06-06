const Playlist = require("../../models/playlist.model");

const deletePlaylistVideo = async (req, res) => {
    try {
        const playlistId = req.playlistId;
        const playlist = await Playlist.findById(playlistId);
        const { videoId } = req.params;
        await playlist.videos.pull({ _id: videoId })
        await playlist.save();
        res.status(200).json({ success: true, data: { deleted: videoId } })
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find playlist video", errorMessage: err.message })
    }
}

module.exports = deletePlaylistVideo;