const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	youtubeUrl: { type: String },
	thumbnailUrl: { type: String },
	views: { type: Number },
	name: { type: String },
	likes: { type: Number },
	dislikes: { type: Number },
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;