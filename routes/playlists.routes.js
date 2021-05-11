const express = require("express");
const mongoose = require('mongoose');
const {User} = require("../models/user.model")
const {Playlist} = require("../models/playlist.model")

const router = express.Router();

router.route("/")
.get(async(req,res) => {
  try{
    const userId = res.locals.userId;
    console.log(userId)
    const user = await User.findById(userId);
    console.log(user);
    const {playlists} = await User.findById(userId).populate("playlists");    
    if(playlists){
      res.status(200).json({success : true, data : {playlists}})
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})  
    }      
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to find user playlists", errorMessage: err.message})
  }  
})

router.route("/")
.post(async(req,res) => {
  try{
    const userId  = res.locals.userId
    const user = await User.findById(userId);
    if(user){
      const playlist = {        
        name: req.body.name,
        type : req.body.type,                
      }
      const newPlaylist = new Playlist(playlist);
      const savedPlaylist = await newPlaylist.save();    
      user.playlists.push(savedPlaylist._id);
      const savedUser = await user.save();
      res.status(201).json({success : true, data : { playlist : savedPlaylist }})
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})
    }    
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to add playlist to user", errorMessage: err.message})
  }  
})

router.route("/:playlistId")
.get(async(req,res) => {
  try{
    const {playlistId} = req.params;
    const playlist = await Playlist.findById(playlistId);
    if(playlist){
      res.status(200).json({success : true, data : { playlist : playlist }})
    } else{
      res.status(404).json({success:true, data : {}, message : "No playlist found with this ID"})
    }
  } catch (err) {
      res.status(500).json({ success: false, message: "unable to find playlist", errorMessage: err.message})
  }  
})


router.route("/:playlistId")
.post(async(req,res) => {
  try{    
    const {playlistId} = req.params;
    const playlist = await Playlist.findById(playlistId);
    if(playlist){
      const updatePlaylist = req.body;
      Object.keys(updatePlaylist).forEach(key => {
        if( key in playlist ){
          playlist[key] = updatePlaylist[key];
        }
      })
      const newPlaylist = await playlist.save();
      res.status(200).json({success : true, data : { playlist : newPlaylist }})
    } else {
      res.status(404).json({success:true, data : {}, message : "No playlist found with this ID"})
    }
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to find playlist", errorMessage: err.message})
  }
})


router.route("/:playlistId")
.delete(async(req,res) => {
  try {
    const {playlistId} = req.params;
    const playlist = await Playlist.findByIdAndDelete(playlistId);    
    if(playlist){        
      const userId  = res.locals.userId
      const user = await User.findById(userId);  
      await user.playlists.pull({ _id: playlistId })
      await user.save();
      res.status(200).json({success : true, data : { playlist, deleted:true }})                
    } else{
      res.status(404).json({success:true, data : {}, message : "No playlist found with this ID"})
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to delete playlist", errorMessage: err.message})
  }
})

router.route("/:playlistId/videos")
.get(async (req,res) => {
  try{
    const userId = res.locals.userId;
    const user = await User.findById(userId);
    if(user){
      const {playlistId} = req.params;
      const {videos} = await Playlist.findById(playlistId);
      if(videos){
        res.status(200).json({success:true, data : { videos }})
      } else{
        res.status(404).json({success:true, data : {}, message : "No playlist found with this ID"})
      }
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})
    }
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to find playlist video", errorMessage: err.message})
  }
})


router.route("/:playlistId/videos")
.post(async (req,res) => {
  try{
    const userId = res.locals.userId;
    const user = await User.findById(userId);
    if(user){
      const {playlistId} = req.params;
      const playlist = await Playlist.findById(playlistId);
      if(playlist){
        const playlistVideo = {
          _id : mongoose.Types.ObjectId(),
          videoId : req.body.videoId,
          time : new Date(req.body.time)
        }
        playlist.videos.push(playlistVideo)
        const newPlaylist = await playlist.save();
        res.status(200).json({success:true, data : { video:playlistVideo }})
      } else{
        res.status(404).json({success:true, data : {}, message : "No playlist found with this ID"})
      }
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})
    }
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to find playlist video", errorMessage: err.message})
  }
})



router.route("/:playlistId/videos/:videoId")
.delete(async (req,res) => {
  try{
    const userId = res.locals.userId;    
    const user = await User.findById(userId);
    if(user){
      const {playlistId} = req.params;
      const playlist = await Playlist.findById(playlistId);
      if(playlist){
        const {videoId} = req.params;
        await playlist.videos.pull({ _id: videoId })
        await playlist.save();

        res.status(200).json({success:true, data : { deleted:true }})
      } else{
        res.status(404).json({success:true, data : {}, message : "No playlist found with this ID"})
      }
    } else {
      res.status(404).json({success:true, data : {}, message : "No user found with this ID"})
    }
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to find playlist video", errorMessage: err.message})
  }
})




module.exports = router