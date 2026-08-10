import api from "./axios";

export const getResumeHistory = () => {
    return api.get("/resume-history");
};

export const getResumeReport = (id) => {
    return api.get(`/resume-history/${id}`);
};