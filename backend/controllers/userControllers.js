const User = require("../Models/userModel")
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utilities/generateTokenAndSetCookie");



const register = async (req, res) => {


    try {


        const { name, username, email, phone, password, confirmPassword } = req.body;


        if (!name || !username || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ success: false, error: "Please fill all the fields." })
        }


        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, error: "Passwords don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(404).json({ success: false, error: "User is  already exists" })
        }
        const userAuthByEmail = await User.findOne({ email })
        if (userAuthByEmail && userAuthByEmail?.email == email) {
            return res.status(404).json({ success: false, error: "User is  already exists" })
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
                success: true,
                data: {
                    _id: newUser._id,
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email
                },
                message: "User Created Successfully"
            })
        } else {
            res.status(200).json({ success: false, error: "Invalid user Data" })
        }


    } catch (error) {
        console.log("Error in Signup Controller", error)
        res.status(500).json({ error: "Internal Server Error", message: error.message })
    }

}

const login = async (req, res) => {


    try {


        const { username, email, password } = req.body;
        // console.log(req.body)

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, error: "Please fill all the fields." })
        }

        const user = await User.findOne({ username, email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid Credentials" })
        }


        if (user && isMatch) {
            generateTokenAndSetCookie(user._id, res);

            res.status(200).json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                },
                message: "User Login Successfully"
            })
        } else {
            res.status(502).json({ success: false, error: "Invalid user Data" })
        }


    } catch (error) {
        console.log("Error in Signin Controller", error)
        res.status(500).json({ error: "Internal Server Error", message: error.message })
    }

}

const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
}

const dashboard = async (req, res) => {

    try {


        const userId = req.userId
        // console.log(userId)
        if (userId) {
            const response = await User.findOne({ _id: userId }).select("-password")
            // console.log(response)
            if (response) {
                res.status(200).json({ success: true, message: 'authenticated', username: response.username });
            }
        }
    } catch (error) {

    }
}

module.exports = { register, login, logout, dashboard }