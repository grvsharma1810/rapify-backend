const User = require("../../models/user.model");

const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (user) {
            const updateUser = req.body;
            Object.keys(updateUser).forEach(key => {
                if (key in user) {
                    user[key] = updateUser[key];
                }
            })
            try {
                const newUser = await user.save();
                res.status(200).json({ user: newUser })
            } catch (err) {
                res.status(400).json({ success: false, message: "unable to add user", errorMessage: err.message })
            }
        } else {
            res.status(404).json({ success: true, data: {}, message: "No user found with this ID" })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "unable to find user", errorMessage: err.message })
    }
}

module.exports = updateUserById;