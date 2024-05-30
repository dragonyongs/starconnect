// authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        // console.log('authHeader', authHeader);
        const token = authHeader && authHeader.split(' ')[1];
        // console.log('token-authenticateToken', token);

        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log('decoded', decoded);

        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.headers['x-refresh-token'];
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateToken,
    verifyRefreshToken,
}
