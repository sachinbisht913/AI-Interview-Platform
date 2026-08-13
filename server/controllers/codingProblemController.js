// File: controllers/codingProblemController.js

const {
    getAllCodingProblems,
    getCodingProblemById,
    getCodingTestCases,
} = require("../models/codingProblemModel");


// ========================================
// Get All Coding Problems
// ========================================

const getAllProblems = async (req, res) => {

    try {

        const problems = await getAllCodingProblems();

        return res.status(200).json({
            success: true,
            problems,
        });

    } catch (error) {

        console.error(
            "Get Coding Problems Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get coding problems.",
        });

    }
};


// ========================================
// Get Single Coding Problem
// ========================================

const getProblemById = async (req, res) => {

    try {

        const { id } = req.params;

        const problem = await getCodingProblemById(id);

        if (!problem) {

            return res.status(404).json({
                success: false,
                message: "Coding problem not found.",
            });

        }

        return res.status(200).json({
            success: true,
            problem,
        });

    } catch (error) {

        console.error(
            "Get Coding Problem Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get coding problem.",
        });

    }
};


// ========================================
// Get Test Cases
// ========================================

const getProblemTestCases = async (req, res) => {

    try {

        const { id } = req.params;

        const testCases =
            await getCodingTestCases(id);

        return res.status(200).json({
            success: true,
            testCases,
        });

    } catch (error) {

        console.error(
            "Get Coding Test Cases Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get test cases.",
        });

    }
};


module.exports = {
    getAllProblems,
    getProblemById,
    getProblemTestCases,
};