const db = require("../config/db");

// ========================================
// Get Notification Preferences
// ========================================

const getNotificationPreferences = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.query(
            `
            SELECT
                interview_reminders,
                interview_results,
                resume_analysis
            FROM notification_preferences
            WHERE user_id = ?
            `,
            [userId]
        );

        // Create default preferences if user doesn't have them yet
        if (rows.length === 0) {

            await db.query(
                `
                INSERT INTO notification_preferences
                (
                    user_id,
                    interview_reminders,
                    interview_results,
                    resume_analysis
                )
                VALUES (?, 1, 1, 1)
                `,
                [userId]
            );

            return res.status(200).json({
                success: true,
                preferences: {
                    interview_reminders: true,
                    interview_results: true,
                    resume_analysis: true,
                },
            });
        }

        const preferences = rows[0];

        return res.status(200).json({
            success: true,
            preferences: {
                interview_reminders:
                    Boolean(preferences.interview_reminders),

                interview_results:
                    Boolean(preferences.interview_results),

                resume_analysis:
                    Boolean(preferences.resume_analysis),
            },
        });

    } catch (error) {

        console.error(
            "Get Notification Preferences Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get notification preferences.",
        });
    }
};


// ========================================
// Update Notification Preferences
// ========================================

const updateNotificationPreferences = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            interview_reminders,
            interview_results,
            resume_analysis,
        } = req.body;

        await db.query(
            `
            INSERT INTO notification_preferences
            (
                user_id,
                interview_reminders,
                interview_results,
                resume_analysis
            )
            VALUES (?, ?, ?, ?)

            ON DUPLICATE KEY UPDATE

                interview_reminders =
                    VALUES(interview_reminders),

                interview_results =
                    VALUES(interview_results),

                resume_analysis =
                    VALUES(resume_analysis)
            `,
            [
                userId,
                interview_reminders ? 1 : 0,
                interview_results ? 1 : 0,
                resume_analysis ? 1 : 0,
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Notification preferences updated successfully.",
            preferences: {
                interview_reminders:
                    Boolean(interview_reminders),

                interview_results:
                    Boolean(interview_results),

                resume_analysis:
                    Boolean(resume_analysis),
            },
        });

    } catch (error) {

        console.error(
            "Update Notification Preferences Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update notification preferences.",
        });
    }
};


// ========================================
// Get Notifications
// ========================================

const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.query(
            `
            SELECT
                id,
                type,
                title,
                message,
                link,
                is_read,
                created_at
            FROM notifications
            WHERE user_id = ?
            ORDER BY created_at DESC
            `,
            [userId]
        );

        return res.status(200).json({
            success: true,
            notifications: rows,
        });

    } catch (error) {

        console.error(
            "Get Notifications Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get notifications.",
        });
    }
};


// ========================================
// Mark Notification As Read
// ========================================

const markNotificationAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const notificationId = req.params.id;

        const [result] = await db.query(
            `
            UPDATE notifications
            SET is_read = 1
            WHERE id = ?
            AND user_id = ?
            `,
            [notificationId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as read.",
        });

    } catch (error) {

        console.error(
            "Mark Notification As Read Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update notification.",
        });
    }
};


// ========================================
// Mark All Notifications As Read
// ========================================

const markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req.user.id;

        await db.query(
            `
            UPDATE notifications
            SET is_read = 1
            WHERE user_id = ?
            AND is_read = 0
            `,
            [userId]
        );

        return res.status(200).json({
            success: true,
            message: "All notifications marked as read.",
        });

    } catch (error) {

        console.error(
            "Mark All Notifications As Read Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update notifications.",
        });
    }
};

module.exports = {
    getNotificationPreferences,
    updateNotificationPreferences,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
};