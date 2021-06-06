const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	youtubeUrl: String,
	thumbnailUrl: String,
	views: Number,
	name: String,
	likes: Number,
	dislikes: Number,
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;