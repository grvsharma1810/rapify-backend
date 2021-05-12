const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require('morgan')
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

const { User } = require('./models/user.model')
const { Video } = require('./models/video.model')

const app = express();

app.use(morgan('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(morgan('dev'))

app.use(bodyParser.json());
app.use(cors())

const { initializeDBConnection } = require("./db/db.connect.js")

const usersRoutes = require("./routes/users.routes.js")

initializeDBConnection();

app.get("/", (req, res) => {
  res.send("API for Rapify")
})

app.use("/login", async (req, res) => {
  try {
    const userCredentials = {
      email: req.body.email,
      password: req.body.password
    }
    console.log({ userCredentials })
    const user = await User.findOne(userCredentials);
    console.log({ user })
    if (user) {
      res.status(200).json({ success: true, data: { user } });
    } else {
      res.status(401).json({ success: false, message: "User Credentials are invalid" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "unable to login user", errorMessage: err.message })
  }
})

app.use("/videos", async (req, res) => {
  let videos = await Video.find({}).populate("user")
  console.log(videos);
  videos = videos.map(video => {
    video.user.email = undefined;
    video.user.password = undefined;
    video.user.playlists = undefined;
    video.user.videos = undefined;
    return video;
  })
  res.status(200).send({ success: true, data: { videos } })
})

app.use("/users", usersRoutes);

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})


/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server Started On Port : ', PORT);
});