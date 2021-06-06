const express = require('express');
const cors = require("cors")
const morgan = require('morgan')
const dotenv = require('dotenv');

const { initializeDBConnection } = require("./db/db.connect.js")

const authRoutes = require("./routes/auth.routes.js")
const usersRoutes = require("./routes/users.routes.js")
const videosRoutes = require("./routes/videos.routes")
const playlistsRoutes = require("./routes/playlists.routes")
const playlistVideosRoutes = require("./routes/playlist-videos.routes")

const authVerify = require("./middlewares/authVerify")

dotenv.config();
const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors())

initializeDBConnection();


// app.use("/login", async (req, res) => {
// 	try {
// 		const userCredentials = {
// 			email: req.body.email,
// 			password: req.body.password
// 		}
// 		console.log({ userCredentials })
// 		const user = await User.findOne(userCredentials);
// 		console.log({ user })
// 		if (user) {
// 			res.status(200).json({ success: true, data: { user } });
// 		} else {
// 			res.status(401).json({ success: false, message: "User Credentials are invalid" });
// 		}
// 	} catch (err) {
// 		res.status(500).json({ success: false, message: "unable to login user", errorMessage: err.message })
// 	}
// })

app.use("/", authRoutes);
app.use("/users", authVerify, usersRoutes);
app.use("/videos", (req, res, next) => { req.userId = req.query.userId; next(); }, videosRoutes);
app.use("/playlists", authVerify, playlistsRoutes);
app.use("/playlists/:playlistId/videos", (req, res, next) => {	
	req.playlistId = req.params.playlistId;
	next();
}, authVerify, playlistVideosRoutes);

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