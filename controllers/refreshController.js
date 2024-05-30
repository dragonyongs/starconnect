const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const secretKey  = crypto.randomBytes(32).toString("hex");

async function refreshToken(req, res) {
    const user = req.user;
    console.log('refreshController-user', user);
    // 새로운 액세스 토큰 생성
    const accessToken = jwt.sign(user, secretKey, { expiresIn: '15m' });
    console.log('refreshController-accessToken', accessToken);

    res.json({ accessToken });
}

module.exports = {
    refreshToken,
}