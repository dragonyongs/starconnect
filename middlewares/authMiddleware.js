const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
async function verifyRefreshToken(req, res, next) {
    const { email } = req.body;
    try {
        const foundUser = await User.findOne({ email: email });
        const refreshToken = foundUser.refreshToken; 

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded; // 검증된 사용자 정보를 req.user에 저장
        next();
    } catch (err) {
        console.error('Error verifying refresh token:', err);
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
}

module.exports = {
    verifyRefreshToken,
}