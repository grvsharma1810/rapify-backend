const Video = require("../../models/video.model");

const getVideos = async (req, res) => {
    const userId = req.userId;
    try {
        let videos = [];
        if (userId) {
            videos = await Video.find({ user: userId }).populate("user");
        } else {
            videos = await Video.find().populate("user")
        }
        console.log(videos);
        videos = videos.map(video => {
            video.user.email = undefined;
            video.user.password = undefined;
            video.user.playlists = undefined;
            video.user.videos = undefined;
            return video;
        })
        res.status(200).json({ videos })
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find user videos", errorMessage: err.message })
    }
}

module.exports = getVideos;