// authHelpers.js

const User = require('../models/userModel');

async function getLoggedInMemberInfo(req) {
    try {
        if (req?.session?.user) {
            const userId = req.session.user._id;
            const userData = await User.findById(userId);
            if (userData) {
                return {
                    id: userData._id,
                    name: userData.name,
                    email: userData.email,
                };
            }
        } 
    } catch (error) {
        console.error("getLoggedInMemberInfo 에러:", error);
    }
}

module.exports = {
    getLoggedInMemberInfo,
};    