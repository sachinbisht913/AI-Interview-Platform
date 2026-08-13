// File: src/api/codingApi.js

import API from "./axios";


// Get all coding problems

export const getCodingProblems = () => {

    return API.get("/coding-problems");

};


// Get one coding problem

export const getCodingProblem = (id) => {

    return API.get(
        `/coding-problems/${id}`
    );

};


// Get test cases

export const getCodingTestCases = (id) => {

    return API.get(
        `/coding-problems/${id}/test-cases`
    );

};

// Run visible test case

export const runCode = (data) => {

    return API.post(
        "/coding/run",
        data
    );

};


// Submit solution

export const submitCode = (data) => {

    return API.post(
        "/coding/submit",
        data
    );

};