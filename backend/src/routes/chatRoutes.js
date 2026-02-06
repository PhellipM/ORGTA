const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, chatController.getMessages);
router.delete('/:id', authMiddleware, chatController.deleteMessage);

module.exports = router;
