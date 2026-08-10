const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/profileController");


const verifyToken = require("../middleware/authMiddleware");


router.get(
    "/",
    verifyToken,
    getProfile
);


router.put(
    "/",
    verifyToken,
    updateProfile
);


router.put(
    "/password",
    verifyToken,
    changePassword
);


module.exports = router;