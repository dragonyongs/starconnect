// registerController.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
    try {
        const { name, password, email, phone, company, hireDate, roles } = req.body;
        // console.log(req.body);

        if (!name || !password || !email) {
            return res.status(400).json({ error: '이름, 비밀번호, 이메일은 필수 입력 사항입니다.' });
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

        // 새로운 사용자를 JSON 형식으로 응답
        res.json(newUser);
    } catch (error) {
        // 오류 처리
        console.error('사용자 등록 중 오류 발생:', error);
        res.status(500).json({ error: '사용자 등록 중 오류가 발생했습니다.' });
    }
}

module.exports = {
    registerUser,
};
