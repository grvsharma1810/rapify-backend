const User = require("../../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (users) {
            res.status(200).json({ users: users } )
        } else {
            res.status(404).json({ users: []  })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to get users", errorMessage: err.message })
    }
}

module.exports = getUsers;