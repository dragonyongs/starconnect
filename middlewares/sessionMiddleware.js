// sessionMiddleware.js

const { getLoggedInMemberInfo } = require('../helpers/authHelpers');

async function assignSessionInfo(req, res, next) {
    try {
        const user = await getLoggedInMemberInfo(req);
        if (user) {
            res.locals.login = {
                user: user
            };
        } else {
            res.locals.login = {
                user: null
            };
        }

        next();
    } catch (error) {
        console.error('미들웨어 에러:', error);
        next(error);
    }
}

module.exports = {
    assignSessionInfo,
};
