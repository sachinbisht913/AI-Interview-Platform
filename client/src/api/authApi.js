import API from "./axios";

// Login
export const loginUser = (data) => {
    return API.post("/auth/login", data);
};

// Signup
export const signupUser = (data) => {
    return API.post("/auth/signup", data);
};

// Forgot password
export const forgotPassword = (email) => {
    return API.post("/auth/forgot-password", {
        email,
    });
};

// Reset password
export const resetPassword = (token, password) => {
    return API.post(`/auth/reset-password/${token}`, {
        password,
    });
};


export const changePassword = (data) => {
    return API.put("/auth/change-password", data);
};

export const deleteAccount = (password) => {
    return API.delete("/auth/delete-account", {
        data: {
            password,
        },
    });
};