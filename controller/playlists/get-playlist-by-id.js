const Playlist = require("../../models/playlist.model");

const getPlaylistById = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await Playlist.findById(playlistId);
        if (playlist) {
            res.status(200).json({playlist: playlist})
        } else {
            res.status(404).json({ message: "No playlist found with this ID" })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find playlist", errorMessage: err.message })
    }
}

module.exports = getPlaylistById;