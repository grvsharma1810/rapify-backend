const express = require("express");
const {User} = require("../models/user.model")
const {Video} = require("../models/video.model")
const {Playlist} = require("../models/playlist.model")

const videosRoutes = require("./videos.routes")
const playlistsRoutes = require("./playlists.routes")

const router = express.Router();


router.route("/")
.get(async (req, res) => {
  try {
    const users = await User.find({}).select("_id name videos avatarUrl").populate("videos");
    if(users){
      res.status(200).json({ success: true, data : {users : users} })
    } else {
      res.status(404).json({ success: true, data : {users : []}})
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to get users", errorMessage: err.message })
  }  
})


router.route("/")
.post(async (req,res) => {
  try {

    const user = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      avatarUrl : req.body.avatarUrl,      
    }    
    const newUser = new User(user);
    let savedUser = await newUser.save();

    const likedPlaylist = {
      name : "Liked",
      type : "default",      
    }
    const historyPlaylist = {
      name : "History",
      type : "default",      
    }
    const watchLaterPlaylist = {
      name : "Watch Later",
      type : "default",      
    }

    const newLikedPlaylist = new Playlist(likedPlaylist);
    const newHistoryPlaylist = new Playlist(historyPlaylist);
    const newWatchLaterPlaylist = new Playlist(watchLaterPlaylist); 
    const savedLikedPlaylist = await newLikedPlaylist.save();
    const savedHistoryPlaylist = await newHistoryPlaylist.save();
    const savedWatchLaterPlaylist = await newWatchLaterPlaylist.save();
    
    savedUser.playlists.push(newLikedPlaylist._id);
    savedUser.playlists.push(newHistoryPlaylist._id);
    savedUser.playlists.push(newWatchLaterPlaylist._id);
    savedUser = await savedUser.save();
    res.status(201).json({success : true, data : {user : savedUser}})
  } catch (err) {    
    res.status(400).json({ success: false, message: "unable to add user", errorMessage: err.message})
  }
})


router.route("/:userId")
.get(async (req,res) => {
  try{
    const {userId} = req.params;
    const user = await User.findById(userId).select("_id name videos avatarUrl").populate("videos");
    if(user){
      res.status(200).json({success : true, data : {user}})
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})  
    }  
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to find user", errorMessage: err.message})
  }
})

router.route("/:userId")
.post(async (req,res) => {
  try{    
    const {userId} = req.params;
    const user = await User.findById(userId);    
    if(user){
      const updateUser = req.body;
      Object.keys(updateUser).forEach(key => {
        if( key in user ){
          user[key] = updateUser[key];
        }
      })
      try{
        const newUser = await user.save();
        res.status(200).json({success : true, data : { user : newUser }})
      } catch (err) {
        res.status(400).json({ success: false, message: "unable to add user", errorMessage: err.message})
      }
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})
    }
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to find user", errorMessage: err.message})
  }
})

router.use("/:userId/videos",(req,res,next) => {
  res.locals.userId = req.params.userId;
  next();
},videosRoutes);


router.use("/:userId/playlists",(req,res,next) => {
  res.locals.userId = req.params.userId;
  next();
},playlistsRoutes);

module.exports = router