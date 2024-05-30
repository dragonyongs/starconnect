// userController.js

const mongoose = require('mongoose');
const User = require('../models/userModel');

async function getUserAll(req, res) {
    const users = await User.find();
    res.json(users);
}

async function getUserById(req, res) {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID가 주어지지 않았습니다." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "유효하지 않은 사용자 ID입니다." });
    }

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(userId)).populate('department team position rank corporateCards');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updatedUser(req, res) {
    const { userId } = req.params;
    const updatedUserInfo = req.body;


    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updatedUserInfo },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }
        // console.log('updatedUser', updatedUser);

        res.json({ message: "사용자 정보가 업데이트되었습니다.", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deletedUser(req, res) {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
        }

        res.json({ message: "사용자가 삭제되었습니다." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserAll,
    getUserById,
    updatedUser,
    deletedUser,
};
