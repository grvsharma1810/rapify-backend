const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const { google } = require("googleapis");
const Playlist = require("../../models/playlist.model");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_CLIENT_ID)

const googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;
        const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
        const { email_verified, email, name, picture } = verify.payload

        if (!email_verified) return res.status(400).json({ msg: "Email is not verified." })

        const password = email + process.env.GOOGLE_SECRET
        const salt = await bcrypt.genSalt(12);
        passwordHash = await bcrypt.hash(password, salt);
        let user = await User.findOne({ email })
        if (!user) {
            user = new User({ name, email, password: passwordHash, avatarUrl: picture })
            await user.save();
            const likedPlaylist = {
                name: "Liked",
                type: "default",
                user: user._id
            }
            const historyPlaylist = {
                name: "History",
                type: "default",
                user: user._id
            }
            const watchLaterPlaylist = {
                name: "Watch Later",
                type: "default",
                user: user._id
            }
            const newLikedPlaylist = new Playlist(likedPlaylist);
            const newHistoryPlaylist = new Playlist(historyPlaylist);
            const newWatchLaterPlaylist = new Playlist(watchLaterPlaylist);
            await newLikedPlaylist.save();
            await newHistoryPlaylist.save();
            await newWatchLaterPlaylist.save();
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        res.status(200).json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false })
    }
}

module.exports = googleLogin;