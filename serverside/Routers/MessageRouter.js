const express = require('express');
const { authMiddleware } = require('../Utils/GlobalFunctions');
const { GetMessageById } = require('../Controllers/messageController');
const router = express.Router();

router.get('/get-message',authMiddleware,GetMessageById);

module.exports = router;