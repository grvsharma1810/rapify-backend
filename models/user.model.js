const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: ["Can't add without name"] },
	email: { type: String, unique: true },
	password: { type: String },
	avatarUrl: { type: String },
})

const User = mongoose.model("User", UserSchema);

module.exports = User;