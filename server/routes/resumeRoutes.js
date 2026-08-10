const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { uploadResume } = require("../controllers/resumeController");
const verifyToken = require("../middleware/authMiddleware");

router.post(
    "/upload",
    verifyToken,
    upload.single("resume"),
    uploadResume
);

module.exports = router;