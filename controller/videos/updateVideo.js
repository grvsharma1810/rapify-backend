const Video = require("../../models/video.model");

const updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await Video.findById(videoId);
        if (video) {
            const updateVideo = req.body;
            Object.keys(updateVideo).forEach(key => {
                if (key in video) {
                    video[key] = updateVideo[key];
                }
            })
            const newVideo = await video.save();
            res.status(200).json({ video: newVideo } )
        } else {
            res.status(404).json({ message: "No video found with this ID" })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find video", errorMessage: err.message })
    }
}

module.exports = updateVideo;