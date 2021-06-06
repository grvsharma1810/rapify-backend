const Playlist = require("../../models/playlist.model");

const updatePlaylistById = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await Playlist.findById(playlistId);
        if (playlist) {
            const updatePlaylist = req.body;
            Object.keys(updatePlaylist).forEach(key => {
                if (key in playlist) {
                    playlist[key] = updatePlaylist[key];
                }
            })
            const newPlaylist = await playlist.save();
            res.status(200).json({ success: true, data: { playlist: newPlaylist } })
        } else {
            res.status(404).json({ success: true, data: {}, message: "No playlist found with this ID" })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find playlist", errorMessage: err.message })
    }
}

module.exports = updatePlaylistById;