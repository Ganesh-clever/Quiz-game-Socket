const express = require('express');
const { userRegister, loginUser } = require('../Controllers/userController');
const router = express.Router();

router.post('/user/register',userRegister);
router.post('/user/login',loginUser);

module.exports = router;