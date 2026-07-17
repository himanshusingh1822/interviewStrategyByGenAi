const express = require('express'); 
const authMiddleware = require('../middleware/authMiddleware');
const interviewReportController = require('../controller/interviewReportController');

// 1. Instantiate Multer directly here to break the file import loop
const multer = require("multer");
const localUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    }
});

const interviewRouter = express.Router();

// 2. Use the local variable name instead
interviewRouter.post(
    '/',
    authMiddleware.authUser,
    localUpload.single('resume'), 
    interviewReportController.generateInterviewReportController
);

module.exports = interviewRouter;
