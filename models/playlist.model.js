const mongoose = require("mongoose")

const PlaylistSchema = new mongoose.Schema({  
  name : String,
  type : String,
  videos : [{
    _id : mongoose.Schema.Types.ObjectId, 
    videoId : {
      type: mongoose.Schema.Types.ObjectId, 
      ref : 'Video'
    },
    time : { type : Date, default: Date.now }
  }]
})

const Playlist = mongoose.model("Playlist",PlaylistSchema)

module.exports = {Playlist}