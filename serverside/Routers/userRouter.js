const express = require('express');
const { userRegister, loginUser, GetAllUsers, GetUserById } = require('../Controllers/userController');
const { authMiddleware } = require('../Utils/GlobalFunctions');
const router = express.Router();

router.post('/user/register',userRegister);
router.post('/user/login',loginUser);
router.get('/get-users',authMiddleware,GetAllUsers);
router.get('/get-user/:userId',authMiddleware,GetUserById);

module.exports = router;