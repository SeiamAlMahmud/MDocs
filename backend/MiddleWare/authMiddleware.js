const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const authMiddleware = async (req, res, next) => {
    // console.log('Auth Middleware Triggered');

    const token = req.cookies.jwt;

    // console.log('Token from Cookie:', token);

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('Decoded:', decoded);

        if (decoded.exp * 1000 < Date.now()) {
            res.clearCookie('jwt');
            return res.status(401).json({ success: false, error: 'Session expired. Please log in again.' });
        }
        // const user = await User.findById(decoded.userId)
        // console.log(user)
        // if (!user) {
        //     return res.status(401).json({ success: false, error: 'Not authenticated' });
        // }
        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    } catch (err) {
        console.error('JWT Error:', err); // Log the error
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }
};


module.exports = authMiddleware;
