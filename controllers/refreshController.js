// refreshController.js
const jwt = require("jsonwebtoken");
const User = require('../models/userModel'); // User 모델을 가져옵니다.

async function refreshToken(req, res) {
    try {
        const { email } = req.body; // 이메일을 요청에서 가져옵니다.

        // 데이터베이스에서 사용자를 찾습니다.
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            return res.status(401).json({ success: false, error: "사용자를 찾을 수 없습니다." });
        }

        // 새로운 액세스 토큰 생성
        const accessToken = jwt.sign(
            { email: foundUser.email, roles: foundUser.roles, name: foundUser.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const accessTokenExpiry = jwt.decode(accessToken).exp * 1000; // ms 단위로 변환
        const expiresIn = new Date(accessTokenExpiry).toISOString();

        res.json({ accessToken, expiresIn });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ error: "Error refreshing token" });
    }
}

module.exports = {
    refreshToken,
}