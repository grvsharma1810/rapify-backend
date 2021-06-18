const Video = require("../../models/video.model");

const createVideo = async (req, res) => {
	try {
		const { userId } = req.tokenData
		const video = {
			user: userId,
			youtubeUrl: req.body.youtubeUrl,
			thumbnailUrl: req.body.thumbnailUrl,
			views: req.body.views,
			name: req.body.name,
			likes: req.body.likes,
			dislikes: req.body.dislikes,
		}
		const newVideo = new Video(video);
		const savedVideo = await newVideo.save();
		res.status(201).json({ video: savedVideo })
	} catch (err) {
		res.status(500).json({ success: false, message: "unable to add video to user", errorMessage: err.message })
	}
}

module.exports = createVideo;