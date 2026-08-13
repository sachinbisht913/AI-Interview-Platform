// File: routes/codingSubmissionRoutes.js

const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const {
    getMyCodingSubmissions,
    getMyCodingSubmissionById,
} = require("../controllers/codingSubmissionController");


router.get(
    "/",
    verifyToken,
    getMyCodingSubmissions
);


router.get(
    "/:id",
    verifyToken,
    getMyCodingSubmissionById
);


module.exports = router;