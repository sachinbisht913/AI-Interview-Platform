// File: src/api/axios.js

import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
});

// Request Interceptor

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor

API.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        // No response means network/server connection problem

        if (!error.response) {
            error.apiMessage =
                "Unable to connect to the server. Please check your internet connection or try again.";
        } else {
            const status = error.response.status;

            switch (status) {
                case 400:
                    error.apiMessage =
                        error.response.data?.message ||
                        "Invalid request.";
                    break;

                case 401:
                    error.apiMessage =
                        error.response.data?.message ||
                        "Your session has expired. Please login again.";

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    break;

                case 403:
                    error.apiMessage =
                        error.response.data?.message ||
                        "You don't have permission to perform this action.";
                    break;

                case 404:
                    error.apiMessage =
                        error.response.data?.message ||
                        "The requested resource was not found.";
                    break;

                case 500:
                    error.apiMessage =
                        "Something went wrong on the server. Please try again later.";
                    break;

                default:
                    error.apiMessage =
                        error.response.data?.message ||
                        "Something went wrong. Please try again.";
            }
        }

        return Promise.reject(error);
    }
);

export default API;