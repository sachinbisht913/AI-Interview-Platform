// File: models/codingProblemModel.js

const db = require("../config/db");

// Get all coding problems
const getAllCodingProblems = async () => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            title,
            description,
            difficulty,
            category,
            constraints,
            examples,
            starter_code,
            execution_template,
            created_at
        FROM coding_problems
        ORDER BY id ASC
        `
    );

    return rows;
};


// Get one coding problem
const getCodingProblemById = async (problemId) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            title,
            description,
            difficulty,
            category,
            constraints,
            examples,
            starter_code,
            execution_template,
            created_at
        FROM coding_problems
        WHERE id = ?
        `,
        [problemId]
    );

    if (rows.length === 0) {
        return null;
    }

    return rows[0];
};


// Get test cases for a problem
const getCodingTestCases = async (problemId) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            input,
            expected_output,
            is_hidden
        FROM coding_test_cases
        WHERE problem_id = ?
        ORDER BY id ASC
        `,
        [problemId]
    );

    return rows;
};


module.exports = {
    getAllCodingProblems,
    getCodingProblemById,
    getCodingTestCases,
};