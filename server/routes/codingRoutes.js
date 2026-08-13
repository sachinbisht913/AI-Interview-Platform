// File: routes/codingRoutes.js

const express = require("express");

const router = express.Router();

const verifyToken =
    require("../middleware/authMiddleware");

const {
    runCode,
    submitCode,
} = require("../controllers/codingController");


router.post(
    "/run",
    verifyToken,
    runCode
);


router.post(
    "/submit",
    verifyToken,
    submitCode
);


module.exports = router;