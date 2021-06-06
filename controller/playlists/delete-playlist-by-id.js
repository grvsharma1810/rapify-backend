const Playlist = require("../../models/playlist.model");

const deletePlaylistById = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await Playlist.findByIdAndDelete(playlistId);
        res.status(200).json({ success: true, data: { deleted: playlist._id } })
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to delete playlist", errorMessage: err.message })
    }
}

module.exports = deletePlaylistById;