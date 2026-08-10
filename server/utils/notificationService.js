const db = require("../config/db");

const createNotification = async ({
    userId,
    type,
    title,
    message,
    link = null,
}) => {
    try {
        // Check user's notification preference
        const [preferences] = await db.query(
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

        // If preferences don't exist, use defaults
        const preference =
            preferences.length > 0
                ? preferences[0]
                : {
                      interview_reminders: 1,
                      interview_results: 1,
                      resume_analysis: 1,
                  };

        // Check whether this notification type is enabled
        const preferenceMap = {
            interview_reminder:
                preference.interview_reminders,

            interview_result:
                preference.interview_results,

            resume_analysis:
                preference.resume_analysis,
        };

        // If preference is explicitly disabled, don't create notification
        if (
            preferenceMap[type] !== undefined &&
            !preferenceMap[type]
        ) {
            return null;
        }

        // Create notification
        const [result] = await db.query(
            `
            INSERT INTO notifications
            (
                user_id,
                type,
                title,
                message,
                link
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                userId,
                type,
                title,
                message,
                link,
            ]
        );

        return result.insertId;

    } catch (error) {
        console.error(
            "Create Notification Error:",
            error
        );

        // Don't break the main application if notification fails
        return null;
    }
};

module.exports = {
    createNotification,
};