// File: routes/dashboardRoutes.js

const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/dashboardController");

const verifyToken = require("../middleware/authMiddleware");

// Get Dashboard Data
router.get("/", verifyToken, getDashboard);

module.exports = router;