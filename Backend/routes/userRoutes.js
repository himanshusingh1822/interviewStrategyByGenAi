const express = require('express');
const { registerUser, logInUser, getMeUser } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware')
const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',logInUser);
userRouter.get('/get-me',authMiddleware.authUser,getMeUser)

module.exports = userRouter ;