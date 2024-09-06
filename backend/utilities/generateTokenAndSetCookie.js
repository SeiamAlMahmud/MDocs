const jwt = require("jsonwebtoken")


const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d"
    }); // openssl rand -base64 32

 return token
}

module.exports = generateTokenAndSetCookie