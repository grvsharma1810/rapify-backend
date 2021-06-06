const Video = require("../../models/video.model");

const getVideoById = async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await Video.findById(videoId);
        res.status(200).json({video: video })
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find video", errorMessage: err.message })
    }
}

module.exports = getVideoById;