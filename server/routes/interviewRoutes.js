const express = require("express");
const router = express.Router();



const {
    startInterview,
    submitAnswer,
} = require("../controllers/interviewController");

const {

    evaluateInterview
    
    } = require("../controllers/interviewResultController");

const verifyToken = require("../middleware/authMiddleware");

router.post(
    "/start",
    verifyToken,
    startInterview
);

router.post(
    "/answer",
    verifyToken,
    submitAnswer
);

router.post(

    "/evaluate",
    
    verifyToken,
    
    evaluateInterview
    
    );

module.exports = router;