// File: controllers/codingController.js

const {
    executeCode,
} = require("../services/codeExecutionService");

const {
    getCodingProblemById,
    getCodingTestCases,
} = require("../models/codingProblemModel");

const {
    createCodingSubmission,
} = require("../models/codingSubmissionModel");


// ========================================
// Run Code
// ========================================

const runCode = async (req, res) => {

    try {

        const {
            problemId,
            language,
            sourceCode,
            testCaseIndex = 0,
        } = req.body;


        // ========================================
        // Validate Request
        // ========================================

        if (
            !problemId ||
            !language ||
            !sourceCode
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Problem, language and source code are required.",

            });

        }


        // ========================================
        // Get Problem
        // ========================================

        const problem =
            await getCodingProblemById(
                problemId
            );


        if (!problem) {

            return res.status(404).json({

                success: false,

                message:
                    "Coding problem not found.",

            });

        }


        // ========================================
        // Check Execution Template
        // ========================================

        if (!problem.execution_template) {

            return res.status(500).json({

                success: false,

                message:
                    "Execution template is not configured for this problem.",

            });

        }


        // ========================================
        // Get Test Cases
        // ========================================

        const testCases =
            await getCodingTestCases(
                problemId
            );


        // Only visible test cases

        const visibleTestCases =
            testCases.filter(
                (testCase) =>
                    !Boolean(testCase.is_hidden)
            );


        if (
            visibleTestCases.length === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "No visible test cases found.",

            });

        }


        // ========================================
        // Select Test Case
        // ========================================

        const selectedTestCase =
            visibleTestCases[testCaseIndex];


        if (!selectedTestCase) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid test case.",

            });

        }


        // ========================================
        // Execute Code
        // ========================================

        const result =
            await executeCode({

                language,

                sourceCode,

                input:
                    selectedTestCase.input,

                expectedOutput:
                    selectedTestCase.expected_output,

                executionTemplate:
                    problem.execution_template,

            });


        // ========================================
        // Return Result
        // ========================================

        return res.status(200).json({

            success: true,

            result: {

                status:
                    result.status,

                stdout:
                    result.stdout,

                stderr:
                    result.stderr,

                compileOutput:
                    result.compileOutput,

                message:
                    result.message,

                time:
                    result.time,

                memory:
                    result.memory,

            },

        });

    } catch (error) {

        console.error(
            "Run Code Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to execute code.",

        });

    }

};


// ========================================
// Submit Code
// ========================================


const submitCode = async (req, res) => {

    try {

        const {
            problemId,
            language,
            sourceCode,
        } = req.body;


        // ========================================
        // Get Logged-in User
        // ========================================

        const userId =
            req.user.id;


        // ========================================
        // Validate Request
        // ========================================

        if (
            !problemId ||
            !language ||
            !sourceCode
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Problem, language and source code are required.",

            });

        }


        // ========================================
        // Get Problem
        // ========================================

        const problem =
            await getCodingProblemById(
                problemId
            );


        if (!problem) {

            return res.status(404).json({

                success: false,

                message:
                    "Coding problem not found.",

            });

        }


        // ========================================
        // Check Execution Template
        // ========================================

        if (!problem.execution_template) {

            return res.status(500).json({

                success: false,

                message:
                    "Execution template is not configured for this problem.",

            });

        }


        // ========================================
        // Get ALL Test Cases
        // ========================================

        const testCases =
            await getCodingTestCases(
                problemId
            );


        if (
            testCases.length === 0
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "No test cases found.",

            });

        }


        // ========================================
        // Execute Test Cases
        // ========================================

        const results = [];


        for (
            let i = 0;
            i < testCases.length;
            i++
        ) {

            const testCase =
                testCases[i];


            const result =
                await executeCode({

                    language,

                    sourceCode,

                    input:
                        testCase.input,

                    expectedOutput:
                        testCase.expected_output,

                    executionTemplate:
                        problem.execution_template,

                });


            // Judge0 status ID 3 = Accepted

            const passed =
                result.status?.id === 3;


            results.push({

                testCase:
                    i + 1,

                passed,

                hidden:
                    Boolean(
                        testCase.is_hidden
                    ),

                status:
                    result.status,

                stdout:
                    result.stdout,

                stderr:
                    result.stderr,

                compileOutput:
                    result.compileOutput,

                time:
                    result.time,

                memory:
                    result.memory,

            });


            // Stop after first failure

            if (!passed) {

                break;

            }

        }


        // ========================================
        // Calculate Submission Result
        // ========================================

        const passedTests =
            results.filter(
                (result) =>
                    result.passed
            ).length;


        const allPassed =
            passedTests ===
            testCases.length;


        // ========================================
        // Determine Status
        // ========================================

        let submissionStatus =
            "Accepted";


        if (!allPassed) {

            const failedResult =
                results.find(
                    (result) =>
                        !result.passed
                );


            if (
                failedResult?.status?.id === 6
            ) {

                submissionStatus =
                    "Compilation Error";

            } else if (
                failedResult?.status?.id === 5
            ) {

                submissionStatus =
                    "Time Limit Exceeded";

            } else if (
                failedResult?.status?.id === 11
            ) {

                submissionStatus =
                    "Runtime Error";

            } else {

                submissionStatus =
                    "Wrong Answer";

            }

        }


        // ========================================
        // Calculate Execution Metrics
        // ========================================

        const executionTimes =
            results
                .map(
                    (result) =>
                        Number(result.time)
                )
                .filter(
                    (time) =>
                        !Number.isNaN(time)
                );


        const executionTime =
            executionTimes.length > 0
                ? Math.max(...executionTimes)
                : null;


        const memoryValues =
            results
                .map(
                    (result) =>
                        Number(result.memory)
                )
                .filter(
                    (memory) =>
                        !Number.isNaN(memory)
                );


        const memoryUsed =
            memoryValues.length > 0
                ? Math.max(...memoryValues)
                : null;


        // ========================================
        // Save Submission
        // ========================================

        const submissionId =
            await createCodingSubmission({

                userId,

                problemId,

                language,

                sourceCode,

                status:
                    submissionStatus,

                passedTests,

                totalTests:
                    testCases.length,

                executionTime,

                memoryUsed,

            });


        // ========================================
        // Return Submission Result
        // ========================================

        return res.status(200).json({

            success: true,

            submissionId,

            accepted:
                allPassed,

            status:
                submissionStatus,

            passedTests,

            totalTests:
                testCases.length,

            results,

            message:
                allPassed
                    ? "All test cases passed."
                    : "Some test cases failed.",

        });

    } catch (error) {

        console.error(
            "Submit Code Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to submit code.",

        });

    }

};


// ========================================
// Exports
// ========================================

module.exports = {

    runCode,

    submitCode,

};