const express = require("express");
const { User } = require("../models/user.model")
const { Video } = require("../models/video.model")

const router = express.Router();

router.route("/")
	.get(async (req, res) => {
		try {
			const userId = res.locals.userId;
			const { videos } = await User.findById(userId).populate("videos");
			if (videos) {
				res.status(200).json({ success: true, data: { videos } })
			} else {
				res.status(404).json({ success: true, data: {}, message: "No user found with this ID" })
			}
		} catch (err) {
			res.status(500).json({ success: false, message: "unable to find user videos", errorMessage: err.message })
		}
	})

router.route("/")
	.post(async (req, res) => {
		try {
			const userId = res.locals.userId
			const user = await User.findById(userId);
			if (user) {
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
				user.videos.push(savedVideo._id);
				const savedUser = await user.save();
				res.status(201).json({ success: true, data: { video: savedVideo } })
			} else {
				res.status(404).json({ success: true, data: {}, message: "No user found with this ID" })
			}
		} catch (err) {
			res.status(500).json({ success: false, message: "unable to add video to user", errorMessage: err.message })
		}
	})

router.route("/:videoId")
	.get(async (req, res) => {
		try {
			const { videoId } = req.params;
			const video = await Video.findById(videoId);
			if (video) {
				res.status(200).json({ success: true, data: { video: video } })
			} else {
				res.status(404).json({ success: true, data: {}, message: "No video found with this ID" })
			}
		} catch (err) {
			res.status(500).json({ success: false, message: "unable to find video", errorMessage: err.message })
		}
	})


router.route("/:videoId")
	.post(async (req, res) => {
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
				res.status(200).json({ success: true, data: { video: newVideo } })
			} else {
				res.status(404).json({ success: true, data: {}, message: "No video found with this ID" })
			}
		} catch (err) {
			res.status(500).json({ success: false, message: "unable to find video", errorMessage: err.message })
		}
	})

module.exports = router