import API from "./axios";

// Get current user's profile
export const getProfile = () => {
    return API.get("/profile");
};

// Update current user's profile
export const updateProfile = (data) => {
    return API.put("/profile", data);
};

// Change password
export const changePassword = (data) => {
    return API.put("/profile/password", data);
};