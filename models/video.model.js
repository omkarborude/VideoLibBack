const mongoose = require("mongoose");
 
const videoSchema = new mongoose.Schema(
  {
  vid:{
    type:String,
    required:"ID required for each item",
    unique:true,
  },
  title:{
    type:String,
    required:"title required for each item  "
  },
  author:String,
  subscriber:Number,
  date:String,
  views:Number,
  image:String,
  // optional
  url:String,
  channelLink:String
},
{
  timestamps:true,
}
);

const Video = mongoose.model("Video",videoSchema);

module.exports = Video;