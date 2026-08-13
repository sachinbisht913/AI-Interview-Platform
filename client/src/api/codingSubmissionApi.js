// File: src/api/codingSubmissionApi.js

import API from "./axios";


// ========================================
// Get My Coding Submissions
// ========================================

export const getCodingSubmissions = () => {

    return API.get(
        "/coding-submissions"
    );

};


// ========================================
// Get Single Coding Submission
// ========================================

export const getCodingSubmissionById = (
    id
) => {

    return API.get(
        `/coding-submissions/${id}`
    );

};