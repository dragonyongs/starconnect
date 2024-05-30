// authController.js

const bcrypt = require("bcrypt");
const User = require('../models/userModel');
const generateTokens = require('../src/utils/tokenUtils');

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ success: false, error: "사용자를 찾을 수 없습니다." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, error: "비밀번호가 일치하지 않습니다." });
        }
        
        const { roles, name, _id } = user;
        req.session.user = { _id, name, email, roles };
        const { accessToken } = generateTokens(name);
        // console.log('login-accessToken', accessToken);
        
        // 로그인 성공 후 액세스 토큰을 클라이언트에게 전달
        res.json({ success: true, message: 'Login successful', email, roles, accessToken, redirectUrl: '/'});

    } catch (error) {
        console.error(error);
        res.status(500).send('Error Login');
    }
}

module.exports = {
    login,
};