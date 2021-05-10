const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');


const users = require("./routers/user.router");
const videos = require("./routers/video.router");
const likedVideos = require("./routers/likedVideos.router");


// middlewares
const routeNotFoundHandler = require("./middlewares/route.errors");
const allErrorsHandler = require("./middlewares/all-errors");
// connection
const initializeConnectionDb = require("./db/db.connect");

const app = express();

app.use(bodyParser.json())
app.use(cors());



const port = 3000;

initializeConnectionDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("/users", users);
app.use("/videos", videos);
app.use("/liked-video", likedVideos);

app.use(routeNotFoundHandler);
app.use(allErrorsHandler);


app.listen( process.env.PORT || port, () => {
    console.log(`server Online!`)
  })