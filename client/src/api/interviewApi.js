// File: src/api/interviewApi.js

import API from "./axios";

export const startInterview = (data) =>
    API.post("/interview/start", data);

export const submitAnswer = (data) =>
    API.post("/interview/answer", data);

export const evaluateInterview = (data) =>
    API.post("/interview/evaluate", data);