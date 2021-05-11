const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({  
  name : {type : String, required : ["Can't add without name"]},
  email : {type : String, unique: true },
  password : String,
  avatarUrl : String,
  videos : [{type: mongoose.Schema.Types.ObjectId, ref : 'Video'}],
  playlists : [{type: mongoose.Schema.Types.ObjectId, ref : 'Playlist'}]
})

const User = mongoose.model("User",UserSchema);

module.exports = {User};