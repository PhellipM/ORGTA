const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Protected routes
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/online', authMiddleware, userController.getOnlineUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);

module.exports = router;
