// apiRoutes.js

const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userController = require('../controllers/userController');
const fileController = require('../controllers/fileController');

// Users 
router.get('/users', userController.getUserAll);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updatedUser);
router.delete('/users/:userId', userController.deletedUser);

// Upload
router.post('/upload', upload.single('image'), fileController.uploadImage);

module.exports = router;