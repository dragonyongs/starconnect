

const jwt = require("jsonwebtoken");

function generateTokens(name) {
    const accessToken = jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    const refreshToken = jwt.sign({ name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' });
    // console.log('generateTokens 실행');
    return { accessToken, refreshToken };
}

module.exports = generateTokens;
