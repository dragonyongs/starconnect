// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');
const refreshController = require('../controllers/refreshController');
const { verifyRefreshToken } = require('../middlewares/authMiddleware');


// login
router.post('/login', authController.login);

// register
router.post('/register', registerController.registerUser);

// token refresh API
router.post('/refresh', verifyRefreshToken, refreshController.refreshToken);

module.exports = router;