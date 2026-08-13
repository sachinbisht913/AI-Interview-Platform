// File: models/codingSubmissionModel.js

const db = require("../config/db");


// ========================================
// Create Coding Submission
// ========================================

const createCodingSubmission = async ({
    userId,
    problemId,
    language,
    sourceCode,
    status,
    passedTests,
    totalTests,
    executionTime,
    memoryUsed,
}) => {

    const [result] = await db.query(
        `
        INSERT INTO coding_submissions
        (
            user_id,
            problem_id,
            language,
            source_code,
            status,
            passed_tests,
            total_tests,
            execution_time,
            memory_used
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            userId,
            problemId,
            language,
            sourceCode,
            status,
            passedTests,
            totalTests,
            executionTime,
            memoryUsed,
        ]
    );


    return result.insertId;

};


// ========================================
// Get User Coding Submissions
// ========================================

const getUserCodingSubmissions = async (
    userId
) => {

    const [rows] = await db.query(
        `
        SELECT
            cs.id,
            cs.problem_id,
            cp.title,
            cp.difficulty,
            cs.language,
            cs.status,
            cs.passed_tests,
            cs.total_tests,
            cs.execution_time,
            cs.memory_used,
            cs.submitted_at
        FROM coding_submissions cs

        INNER JOIN coding_problems cp
            ON cs.problem_id = cp.id

        WHERE cs.user_id = ?

        ORDER BY cs.submitted_at DESC
        `,
        [userId]
    );


    return rows;

};


// ========================================
// Get Single Submission
// ========================================

const getCodingSubmissionById = async (
    submissionId,
    userId
) => {

    const [rows] = await db.query(
        `
        SELECT
            cs.id,
            cs.problem_id,
            cp.title,
            cp.difficulty,
            cs.language,
            cs.source_code,
            cs.status,
            cs.passed_tests,
            cs.total_tests,
            cs.execution_time,
            cs.memory_used,
            cs.submitted_at
        FROM coding_submissions cs

        INNER JOIN coding_problems cp
            ON cs.problem_id = cp.id

        WHERE cs.id = ?
        AND cs.user_id = ?
        `,
        [
            submissionId,
            userId,
        ]
    );


    if (rows.length === 0) {
        return null;
    }


    return rows[0];

};

// ========================================
// Get Solved Coding Problems Count
// ========================================

const getUserCodingSolvedCount = async (userId) => {

    const [rows] = await db.query(
        `
        SELECT COUNT(DISTINCT problem_id) AS codingSolved
        FROM coding_submissions
        WHERE user_id = ?
        AND status = 'Accepted'
        `,
        [userId]
    );

    return rows[0].codingSolved || 0;
};

module.exports = {

    createCodingSubmission,

    getUserCodingSubmissions,

    getCodingSubmissionById,
    getUserCodingSolvedCount,

};