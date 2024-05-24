// registerController.js

const User = require('../models/userModel');

async function registerUser(req, res) {
    try {

        console.log(req.body);
        // 요청 본문에서 받은 데이터 검증 및 필요한 가공 작업 수행
        const { name, password, email, personalPhone, companyName, hireDate } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ error: '이름, 비밀번호, 이메일은 필수 입력 사항입니다.' });
        }
        // 여기에 필요한 검증 및 가공 작업을 추가할 수 있습니다.

        // 새로운 사용자 생성 및 MongoDB에 저장
        const newUser = await User.create({
            name,
            password,
            email,
            personalPhone,
            companyName,
            hireDate
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
