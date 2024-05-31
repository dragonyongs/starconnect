// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const refreshController = require('../controllers/refreshController');
const { verifyRefreshToken } = require('../middlewares/authMiddleware');

// login
router.post('/login', authController.login);

// logout
router.post('/logout', authController.logout);

// register
router.post('/register', authController.registerUser);

// token refresh API
router.post('/refresh', verifyRefreshToken, refreshController.refreshToken);

module.exports = router;
