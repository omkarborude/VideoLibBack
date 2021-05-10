const mongoose = require('mongoose');
const express = require('express');

const likedVideosSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  videos:[{_id:{type:mongoose.Schema.Types.ObjectId,ref:'Video'},active:Boolean}]
})


const LikedVideo = mongoose.model('LikedVideo',likedVideosSchema);

module.exports = LikedVideo;