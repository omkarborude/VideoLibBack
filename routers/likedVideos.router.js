const express = require('express');
const router = express.Router();
const  LikedVideo = require('../models/likedVideos.router');
const User = require('../models/user.model');

router.route("/")
.get(async(req,res)=> {
  const likedVideos = await LikedVideo.find({});
  res.json({success:true,likedVideos})
})

router.param("userId",async(req,res,next,userId)=> {
  try{
    let user = await User.findOne({_id:userId});
    if(!user) {
      res.status(400).json({success:false,message:"user is not available!"})
      throw Error("user is not available")
    }
    let likedVideo = await LikedVideo.findOne({userId});

    if(!likedVideo){
      likedVideo = new LikedVideo({userId,videos:[]});
      likedVideo = await likedVideo.save();
    }
    req.likedVideo = likedVideo;
    next();
  } catch(error) {
    res.status(500).json({success:false,message:"PLease check error message",errormessage:error.message})
  }
})

const getLikedVideoItems = async (likedVideo) => {
  likedVideo.videos = likedVideo.videos.filter((video) => video.active);
  likedVideo = await likedVideo.populate("videos._id").execPopulate();
  return likedVideo.videos.map((video) => video._id);
};

router.route("/:userId")
.get(async(req,res)=> {
    try{
      let {likedVideo} = req;
      let likedVideoitems = await getLikedVideoItems(likedVideo);
      res.json({success:true,likedVideoitems})
    } catch(error) {
    res.status(500).json({success:false,message:"PLease check error message",errormessage:error.message})
  }
})
.post(async(req,res)=> {
  const {_id} = req.body;
  const {likedVideo} = req;
  let rS;
  const videoExists = likedVideo.videos.some((video)=> video._id == _id);
  if(videoExists){
    rS = 200;
    for(let video of likedVideo.videos){
      if(video._id == _id ){
        video.active = !video.active;
        break;
      }
    }
  } else {
    rS = 201;
    likedVideo.videos.push({_id,active:true})
  }
  let updatedLikedVideo = await likedVideo.save();
  let likedVideoitems = await getLikedVideoItems(updatedLikedVideo);
  res.status(rS).json({success:true,likedVideo:likedVideoitems})

})

module.exports = router;