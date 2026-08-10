const express = require("express");

const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const {
    signup,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    deleteAccount,
} = require("../controllers/authController");


router.post(
    "/signup",
    signup
);


router.post(
    "/login",
    login
);


router.post(
    "/forgot-password",
    forgotPassword
);


router.post(
    "/reset-password/:token",
    resetPassword
);

router.put(
    "/change-password",
    verifyToken,
    changePassword
);
router.delete(
    "/delete-account",
    verifyToken,
    deleteAccount
);


module.exports = router;