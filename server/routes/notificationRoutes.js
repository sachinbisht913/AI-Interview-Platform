const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    getNotificationPreferences,
    updateNotificationPreferences,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} = require("../controllers/notificationController");


// Get preferences

router.get(
    "/preferences",
    verifyToken,
    getNotificationPreferences
);


// Update preferences

router.put(
    "/preferences",
    verifyToken,
    updateNotificationPreferences
);


router.get(
    "/",
    verifyToken,
    getNotifications
);

router.put(
    "/:id/read",
    verifyToken,
    markNotificationAsRead
);

router.put(
    "/read-all",
    verifyToken,
    markAllNotificationsAsRead
);

module.exports = router;