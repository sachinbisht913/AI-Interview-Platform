// File: src/api/resumeApi.js

import API from "./axios";

export const uploadResume = (formData) => {
    return API.post("/resume/upload", formData);
};