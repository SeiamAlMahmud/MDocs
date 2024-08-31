const User = require("../Models/userModel")
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utilities/generateTokenAndSetCookie");



const register = async (req, res) => {


    try {


        const { name, username, email, phone, password, confirmPassword } = req.body;


        if (!name || !username || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ error: "Please fill all the fields." })
        }


        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ error: "User is  already exists" })
        }
        const userAuthByEmail = await User.findOne({ email })
        if (userAuthByEmail && userAuthByEmail?.email == email) {
            return res.status(400).json({ error: "User is  already exists" })
        }

        // HASHING PASSWORD

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        // https://avatar-placeholder.iran.liara.run/document



        const newUser = new User({
            name,
            username,
            email,
            phone,
            password: hashedPassword
        })

        if (newUser) {
            // Generate Jwt Token
            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email
            })
        } else {
            res.status(200).json({ error: "Invalid user Data" })
        }


    } catch (error) {
        console.log("Error in Signup Controller", error)
        res.status(500).json({ error: "Internal Server Error", message: error.message })
    }

}

module.exports = { register }