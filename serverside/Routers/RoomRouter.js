const express = require('express');
const { CreateRoom, GetRoom, UpdateRoom, DeleteRoom, GetByIdRoom, GetAllQuizRoom } = require('../Controllers/roomController');
const { authMiddleware } = require('../Utils/GlobalFunctions');
const router = express.Router();

router.post('/create-room',authMiddleware,CreateRoom);
router.get('/get-room',authMiddleware,GetRoom);
router.get('/get-quiz-room',authMiddleware,GetAllQuizRoom);
router.get('/get-room/:roomId',authMiddleware,GetByIdRoom);
router.put('/update-room/:roomId',authMiddleware,UpdateRoom);
router.delete('/delete-room/:roomId',authMiddleware,DeleteRoom);

module.exports = router;