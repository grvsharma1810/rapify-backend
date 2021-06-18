const Playlist = require("../../models/playlist.model");

const createPlaylist = async (req, res) => {
    try {
        const { userId } = req.tokenData;
        const playlist = {
            name: req.body.name,
            type: req.body.type,
            user: userId
        }
        const newPlaylist = new Playlist(playlist);
        const savedPlaylist = await newPlaylist.save();
        res.status(201).json({ playlist: savedPlaylist })
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to add playlist to user", errorMessage: err.message })
    }
}

module.exports = createPlaylist;