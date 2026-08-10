const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    getResumeHistory,
    getResumeReport,
} = require("../controllers/resumeHistoryController");

router.get(
    "/",
    verifyToken,
    getResumeHistory
);

router.get(
    "/:id",
    verifyToken,
    getResumeReport
);

module.exports = router;