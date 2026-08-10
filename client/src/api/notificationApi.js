import API from "./axios";

// Get notification preferences
export const getNotificationPreferences = () => {
    return API.get("/notifications/preferences");
};

// Update notification preferences
export const updateNotificationPreferences = (data) => {
    return API.put(
        "/notifications/preferences",
        data
    );
};

export const getNotifications = () => {
    return API.get("/notifications");
};

export const markNotificationAsRead = (id) => {
    return API.put(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = () => {
    return API.put("/notifications/read-all");
};