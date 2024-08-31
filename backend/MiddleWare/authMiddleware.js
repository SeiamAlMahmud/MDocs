const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({success: false,  error: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decoded.payload.exp * 1000 < Date.now()) {
            // Token has expired
            res.clearCookie('jwt');
            return res.status(401).json({success: false, error: 'Session expired. Please log in again.' });
        }
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
