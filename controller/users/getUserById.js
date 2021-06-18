const User = require("../../models/user.model");

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select("-password");
        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(404).json({message: "No user found with this ID" })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find user", errorMessage: err.message })
    }
}

module.exports = getUserById;