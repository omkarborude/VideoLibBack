const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const Video = require("../models/video.model")

router.route("/")
.get(async(req,res)=> {
    
    try{
      const videos = await Video.find({});
      res.json({success:true,videos})
    } catch(error) {
      res.status(500).json({success:false,message:"check error message",errormessage:error.message})
    }
})
.post(async(req,res)=> {

  try{
    const video = req.body;
    const updateVideo = new Video(video);
    const saveDBVideo = await updateVideo.save();
    res.status(200).json({success:true,video:saveDBVideo})
  }catch(error){
    res.status(500).json({status:false,message:"check error message",errormessage:error.message})
  }
})

router.param("videoId",async(req,res,next,vId)=> {
  try{
    const video = await Video.findById(vId);
    if(!video){
      throw Error("Can't load data!")
    }req.video = video;
    next();
  } catch(error){
    res.status(500).json({success:false,message:"check error message",errormessage:error.message})
  }
})

module.exports = router;