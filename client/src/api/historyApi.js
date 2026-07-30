import API from "./axios";

export const getHistory = () =>
    API.get("/history");

export const getInterviewReport = (id) =>
    API.get(`/history/report/${id}`);