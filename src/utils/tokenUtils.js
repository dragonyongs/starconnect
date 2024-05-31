const jwt = require("jsonwebtoken");

function generateTokens(foundUser) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    const accessToken = jwt.sign({ foundUser, roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ foundUser }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
}

module.exports = generateTokens;

