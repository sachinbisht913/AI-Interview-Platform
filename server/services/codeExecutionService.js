// File: services/codeExecutionService.js

const axios = require("axios");

const JUDGE0_URL =
    process.env.JUDGE0_URL ||
    "https://ce.judge0.com";


// ========================================
// Judge0 Language IDs
// ========================================

const LANGUAGE_IDS = {

    javascript: 63,

    python: 71,

    java: 62,

    cpp: 54,

};


// ========================================
// Parse Execution Template
// ========================================

const getExecutionTemplate = (
    executionTemplate,
    language
) => {

    if (!executionTemplate) {
        return null;
    }


    let template =
        executionTemplate;


    // MySQL JSON may already be an object
    // but sometimes it can arrive as a string.

    if (typeof template === "string") {

        try {

            template =
                JSON.parse(template);

        } catch (error) {

            console.error(
                "Execution template JSON parse error:",
                error
            );

            return null;

        }

    }


    return template[language] || null;

};


// ========================================
// Build Executable Code
// ========================================

const buildExecutableCode = ({
    language,
    sourceCode,
    executionTemplate,
    input,
}) => {

    // Get template for selected language

    const template =
        getExecutionTemplate(
            executionTemplate,
            language
        );


    if (!template) {

        throw new Error(
            `Execution template not found for ${language}.`
        );

    }


    // ========================================
    // Parse Test Case Input
    // ========================================

    let parsedInput;

    try {

        parsedInput =
            typeof input === "string"
                ? JSON.parse(input)
                : input;

    } catch (error) {

        throw new Error(
            "Invalid test case input format."
        );

    }


    // ========================================
    // Prepare Input Values
    // ========================================

    const inputJson =
        JSON.stringify(parsedInput);


    // Used by Java / C++

    const inputNums =
        Array.isArray(parsedInput?.nums)
            ? parsedInput.nums.join(", ")
            : "";


    const inputTarget =
        parsedInput?.target !== undefined
            ? parsedInput.target
            : "";


    // ========================================
    // Replace Template Placeholders
    // ========================================

    const executableCode =
        template
            .replace(
                /USER_CODE/g,
                sourceCode
            )
            .replace(
                /INPUT_JSON/g,
                inputJson
            )
            .replace(
                /INPUT_NUMS/g,
                inputNums
            )
            .replace(
                /INPUT_TARGET/g,
                inputTarget
            );


    return executableCode;

};


// ========================================
// Submit Code to Judge0
// ========================================

const submitToJudge0 = async ({
    language,
    sourceCode,
    expectedOutput,
}) => {

    const languageId =
        LANGUAGE_IDS[language];


    if (!languageId) {

        throw new Error(
            "Unsupported programming language."
        );

    }


    try {

        const response =
            await axios.post(

                `${JUDGE0_URL}/submissions`,

                {
                    language_id:
                        languageId,

                    source_code:
                        sourceCode,

                    stdin:
                        "",

                    expected_output:
                        expectedOutput || "",
                },

                {
                    params: {

                        base64_encoded:
                            "false",

                        wait:
                            "true",

                    },

                    headers: {

                        "Content-Type":
                            "application/json",

                    },

                    timeout:
                        60000,

                }

            );


        return response.data;

    } catch (error) {

        console.error(
            "Judge0 Error:",
            error.response?.data ||
            error.message
        );

        throw new Error(
            "Code execution service is unavailable."
        );

    }

};


// ========================================
// Execute Code
// ========================================

const executeCode = async ({
    language,
    sourceCode,
    input,
    expectedOutput,
    executionTemplate,
}) => {

    // ========================================
    // Validate Source Code
    // ========================================

    if (
        !sourceCode ||
        !sourceCode.trim()
    ) {

        throw new Error(
            "Source code is required."
        );

    }


    // ========================================
    // Validate Input
    // ========================================

    if (
        input === undefined ||
        input === null ||
        input === ""
    ) {

        throw new Error(
            "Test case input is required."
        );

    }


    // ========================================
    // Build Executable Program
    // ========================================

    const executableCode =
        buildExecutableCode({

            language,

            sourceCode,

            executionTemplate,

            input,

        });


    // ========================================
    // Send Program to Judge0
    // ========================================

    const result =
        await submitToJudge0({

            language,

            sourceCode:
                executableCode,

            expectedOutput,

        });


    // ========================================
    // Normalize Judge0 Result
    // ========================================

    return {

        status:
            result.status || null,

        stdout:
            result.stdout || "",

        stderr:
            result.stderr || "",

        compileOutput:
            result.compile_output || "",

        message:
            result.message || "",

        time:
            result.time || null,

        memory:
            result.memory || null,

    };

};


// ========================================
// Exports
// ========================================

module.exports = {

    executeCode,

    buildExecutableCode,

};