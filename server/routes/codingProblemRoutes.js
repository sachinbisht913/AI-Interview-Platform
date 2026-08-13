// File: routes/codingProblemRoutes.js

const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    getAllProblems,
    getProblemById,
    getProblemTestCases,
} = require("../controllers/codingProblemController");


// Get all coding problems

router.get(
    "/",
    verifyToken,
    getAllProblems
);


// Get single problem

router.get(
    "/:id",
    verifyToken,
    getProblemById
);


// Get test cases

router.get(
    "/:id/test-cases",
    verifyToken,
    getProblemTestCases
);


module.exports = router;