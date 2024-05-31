const jwt = require("jsonwebtoken");

async function refreshToken(req, res) {
    const user = req.user;
    // 새로운 액세스 토큰 생성
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
}

module.exports = {
    refreshToken,
}
