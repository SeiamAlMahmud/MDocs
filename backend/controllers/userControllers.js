const User = require("../Models/userModel")
const bcryptjs = require("bcryptjs")



const register = async (req, res) => {

    const { name, username, email, phone, password, confirmPassword } = req.body;

    if (!name || !username || !email || !phone || !password || !confirmPassword) {
        return res.status(502).json({ success: false, error: "Please fill all the fields." })
    }

    if (password !== confirmPassword) {
        return res.status(502).json({ success: false, error: "Password didn't match." })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
        return res.status(404).json({ success: false, error: "Already have an accound." })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        return res.status(404).json({ success: false, error: "Already have an accound." })
    }

    const salt = bcryptjs.genSalt(10)
    const hashingPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
        name,
        username,
        email,
        phone,
        password: hashingPassword,
    })

    await newUser.save()

    res.status(201).json({success: true, message: "Successfully created.", data: newUser})

}

module.exports = { register }