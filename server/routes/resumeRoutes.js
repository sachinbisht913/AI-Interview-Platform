const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { uploadResume } = require("../controllers/resumeController");

// Protected route
router.post(
    "/upload",
    upload.single("resume"),
    uploadResume
);

module.exports = router;