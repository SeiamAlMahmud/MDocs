const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const authMiddleware = async (req, res, next) => {
    // console.log('Auth Middleware Triggered');

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    // console.log('Token from Cookie:', token);

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log('Decoded:', decoded);

        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    } catch (err) {
        console.error('JWT Error:', err); // Log the error
        return res.status(401).json({ success: false, error: 'Invalid token' , message: err.message});
    }
};


module.exports = authMiddleware;
