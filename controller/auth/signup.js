const bcrypt = require('bcryptjs');
const User = require("../../models/user.model");
const Playlist = require("../../models/playlist.model");

const signup = async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            avatarUrl: req.body.avatarUrl,
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(password, salt);
        const newUser = new User(user);
        let savedUser = await newUser.save();

        const likedPlaylist = {
            name: "Liked",
            type: "default",
            user: savedUser._id
        }
        const historyPlaylist = {
            name: "History",
            type: "default",
            user: savedUser._id
        }
        const watchLaterPlaylist = {
            name: "Watch Later",
            type: "default",
            user: savedUser._id
        }
        const newLikedPlaylist = new Playlist(likedPlaylist);
        const newHistoryPlaylist = new Playlist(historyPlaylist);
        const newWatchLaterPlaylist = new Playlist(watchLaterPlaylist);
        await newLikedPlaylist.save();
        await newHistoryPlaylist.save();
        await newWatchLaterPlaylist.save();
                
        res.status(201).json({ success: true })
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false })
    }
}

module.exports = signup;