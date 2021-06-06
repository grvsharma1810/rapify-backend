const Playlist = require("../../models/playlist.model");

const getUserPlaylists = async (req, res) => {
    try {
        const { userId } = req.tokenData;
        console.log(userId)
        const playlists = await Playlist.find({ user: userId });        
        res.status(200).json({ playlists }) 
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find user playlists", errorMessage: err.message })
    }
}

module.exports = getUserPlaylists;