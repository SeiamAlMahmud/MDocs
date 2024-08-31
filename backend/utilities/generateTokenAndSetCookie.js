const jwt = require("jsonwebtoken")


const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d"
    }); // openssl rand -base64 32

    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, //miliseconds
        httpOnly: true, // prevent XSS Attacks cross-site scripting attacks
        sameSite: "strict", //CSRF Attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })
}

module.exports = generateTokenAndSetCookie