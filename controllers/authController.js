// authController.js

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function login(req, res) {
    const { email, password } = req.body;
    console.log('login-password', password);
    try {
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            return res.status(401).json({ success: false, error: "사용자를 찾을 수 없습니다." });
        }

        const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, error: "비밀번호가 일치하지 않습니다." });
        }

        const { roles, name } = foundUser;
        const accessToken = jwt.sign({ email, name, roles: roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        const accessTokenExpiry = jwt.decode(accessToken).exp * 1000; // milliseconds
        const expiresIn = new Date(accessTokenExpiry).toISOString(); // ISO 8601 format


        console.log('login-expiresIn', expiresIn);
        
        foundUser.accessToken = accessToken;
        foundUser.refreshToken = refreshToken;

        await foundUser.save();

        res.json({ success: true, message: 'Login successful', email, roles, accessToken, refreshToken, expiresIn, redirectUrl: '/' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Login');
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
};

async function registerUser(req, res) {
    try {
        const { name, password, email, phone, company, hireDate, roles } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ error: '이름, 비밀번호, 이메일은 필수 입력 사항입니다.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(409).json({ error: '이미 사용 중인 이메일입니다. '});
        }

        const slatRounds = 10;
        const hashedPassword = await bcrypt.hash(password, slatRounds);

        const newUser = await User.create({
            name,
            password: hashedPassword,
            email,
            phone,
            company,
            hireDate,
            roles
        });

        res.json(newUser);
    } catch (error) {
        console.error('사용자 등록 중 오류 발생:', error);
        res.status(500).json({ error: '사용자 등록 중 오류가 발생했습니다.' });
    }
}

module.exports = {
    login,
    logout,
    registerUser
};
