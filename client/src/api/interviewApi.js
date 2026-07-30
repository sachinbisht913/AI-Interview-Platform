import API from "./axios";

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export const startInterview = (data) =>
    API.post("/interview/start", data);
        
export const submitAnswer = (data) =>
    API.post("/interview/answer", data);


export const evaluateInterview = (data) =>
    API.post("/interview/evaluate", data);