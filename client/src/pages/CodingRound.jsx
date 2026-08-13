// File: src/pages/CodingRound.jsx

import { useEffect, useState } from "react";

import {
    Play,
    Send,
    RotateCcw,
    Clock,
    CheckCircle2,
    Code2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Terminal,
    Lightbulb,
} from "lucide-react";

import Editor from "@monaco-editor/react";
import {
    getCodingProblems,
    getCodingTestCases,
    runCode,
    submitCode,
} from "../api/codingApi";

import { useTheme } from "../context/ThemeContext";




function CodingRound() {
    const [isRunning, setIsRunning] =
    useState(false);

const [isSubmitting, setIsSubmitting] =
    useState(false);

const [executionResult, setExecutionResult] =
    useState(null);

    const [testCases, setTestCases] = useState([]);

const [selectedTestCase, setSelectedTestCase] =
    useState(0);

const [testCasesLoading, setTestCasesLoading] =
    useState(false);

    const { theme } = useTheme();


    // ========================================
    // State
    // ========================================

    const [problems, setProblems] = useState([]);

    const [currentProblem, setCurrentProblem] =
        useState(null);

    const [language, setLanguage] =
        useState("javascript");

    const [code, setCode] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");
        const [timeLeft, setTimeLeft] = useState(30 * 60);
        const timeExpired = timeLeft === 0;

        // ========================================
// Coding Round Timer
// ========================================

useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft((previousTime) => {
            if (previousTime <= 1) {
                clearInterval(timer);
                return 0;
            }

            return previousTime - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
}, []);

const minutes = Math.floor(timeLeft / 60);
const seconds = timeLeft % 60;

const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
).padStart(2, "0")}`;

        const fetchTestCases = async (problemId) => {

            try {
        
                setTestCasesLoading(true);
        
                const response =
                    await getCodingTestCases(problemId);
        
                const allTestCases =
                    response.data.testCases || [];
        
                // Only expose visible test cases
                const visibleTestCases =
                    allTestCases.filter(
                        (testCase) =>
                            !Boolean(testCase.is_hidden)
                    );
        
                setTestCases(visibleTestCases);
        
                setSelectedTestCase(0);
        
            } catch (error) {
        
                console.error(
                    "Fetch Test Cases Error:",
                    error
                );
        
                setTestCases([]);
        
            } finally {
        
                setTestCasesLoading(false);
        
            }
        
        };


        const handleRunCode = async () => {

           if (!currentProblem || timeExpired) {
    return;
}
        
            try {
        
                setIsRunning(true);
        
                setExecutionResult(null);
        
                const response =
                    await runCode({
        
                        problemId:
                            currentProblem.id,
        
                        language,
        
                        sourceCode:
                            code,
        
                        testCaseIndex:
                            selectedTestCase,
        
                    });
        
        
                setExecutionResult(
                    response.data.result
                );
        
            } catch (error) {
        
                console.error(
                    "Run Code Error:",
                    error
                );
        
                setExecutionResult({
        
                    status: {
                        description:
                            "Execution failed",
                    },
        
                    stderr:
                        error.apiMessage ||
                        "Unable to execute code.",
        
                });
        
            } finally {
        
                setIsRunning(false);
        
            }
        
        };


        const handleSubmitCode = async () => {

            if (!currentProblem) {
                return;
            }
        
            try {
        
                setIsSubmitting(true);
        
                setExecutionResult(null);
        
        
                const response =
                    await submitCode({
        
                        problemId:
                            currentProblem.id,
        
                        language,
        
                        sourceCode:
                            code,
        
                    });
        
        
                setExecutionResult({
        
                    submission: true,
        
                    ...response.data,
        
                });
        
            } catch (error) {
        
                console.error(
                    "Submit Code Error:",
                    error
                );
        
                setExecutionResult({
        
                    submission: true,
        
                    accepted: false,
        
                    message:
                        error.apiMessage ||
                        "Unable to submit solution.",
        
                });
        
            } finally {
        
                setIsSubmitting(false);
        
            }
        
        };

    // ========================================
    // Fetch Problems
    // ========================================

    useEffect(() => {

        fetchProblems();

    }, []);


    const fetchProblems = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getCodingProblems();

            const data = response.data;

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Failed to load coding problems."
                );

            }

            const fetchedProblems =
                data.problems || [];

            setProblems(fetchedProblems);


            // Load first problem

            if (fetchedProblems.length > 0) {

                const firstProblem =
                    fetchedProblems[0];

                    setCurrentProblem(firstProblem);

                    const starterCode =
                        getStarterCode(
                            firstProblem,
                            language
                        );
                    
                    setCode(starterCode);
                    
                    await fetchTestCases(firstProblem.id);

            }

        } catch (error) {

            console.error(
                "Fetch Coding Problems Error:",
                error
            );

            setError(
                error.apiMessage ||
                error.message ||
                "Failed to load coding problems."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // Get Starter Code
    // ========================================

    const getStarterCode = (
        problem,
        selectedLanguage
    ) => {

        if (!problem?.starter_code) {
            return "";
        }

        let starterCode =
            problem.starter_code;


        // Handle JSON returned as string

        if (typeof starterCode === "string") {

            try {

                starterCode =
                    JSON.parse(starterCode);

            } catch (error) {

                console.error(
                    "Starter code JSON parse error:",
                    error
                );

                return starterCode;

            }

        }


        return (
            starterCode[selectedLanguage] ||
            ""
        );

    };


    // ========================================
    // Parse Examples
    // ========================================

    const getExamples = () => {

        if (!currentProblem?.examples) {
            return [];
        }

        if (
            Array.isArray(
                currentProblem.examples
            )
        ) {

            return currentProblem.examples;

        }

        if (
            typeof currentProblem.examples ===
            "string"
        ) {

            try {

                const parsed =
                    JSON.parse(
                        currentProblem.examples
                    );

                return Array.isArray(parsed)
                    ? parsed
                    : [];

            } catch (error) {

                console.error(
                    "Examples JSON parse error:",
                    error
                );

                return [];

            }

        }

        return [];

    };

    const handleNextProblem = async () => {

        const currentIndex =
            problems.findIndex(
                (problem) =>
                    problem.id === currentProblem.id
            );
    
        if (
            currentIndex === -1 ||
            currentIndex >= problems.length - 1
        ) {
            return;
        }
    
        const nextProblem =
            problems[currentIndex + 1];
    
        setCurrentProblem(nextProblem);
    
        setLanguage("javascript");
    
        setCode(
            getStarterCode(
                nextProblem,
                "javascript"
            )
        );
    
        await fetchTestCases(nextProblem.id);
    };

    const handlePreviousProblem = async () => {

        const currentIndex =
            problems.findIndex(
                (problem) =>
                    problem.id === currentProblem.id
            );
    
        if (
            currentIndex <= 0
        ) {
            return;
        }
    
        const previousProblem =
            problems[currentIndex - 1];
    
        setCurrentProblem(previousProblem);
    
        setLanguage("javascript");
    
        setCode(
            getStarterCode(
                previousProblem,
                "javascript"
            )
        );
    
        await fetchTestCases(
            previousProblem.id
        );
    };


    // ========================================
    // Language Change
    // ========================================

    const handleLanguageChange = (event) => {

        const newLanguage =
            event.target.value;

        setLanguage(newLanguage);

        if (currentProblem) {

            setCode(
                getStarterCode(
                    currentProblem,
                    newLanguage
                )
            );

        }

    };


    // ========================================
    // Reset Code
    // ========================================

    const handleReset = () => {

        if (!currentProblem) {
            return;
        }

        setCode(
            getStarterCode(
                currentProblem,
                language
            )
        );

    };


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (

            <div
                className="
                    coding-round-page
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                "
            >

                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            h-8
                            w-8
                            animate-spin
                            rounded-full
                            border-4
                            border-blue-500
                            border-t-transparent
                        "
                    />

                    <p
                        className="
                            mt-4
                            text-sm
                            text-slate-400
                        "
                    >
                        Loading coding problems...
                    </p>

                </div>

            </div>

        );

    }


    // ========================================
    // Error
    // ========================================

    if (error) {

        return (

            <div
                className="
                    coding-round-page
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                    px-4
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-2xl
                        border
                        border-red-500/20
                        bg-red-500/5
                        p-6
                        text-center
                    "
                >

                    <p
                        className="
                            text-sm
                            font-medium
                            text-red-500
                        "
                    >
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={fetchProblems}
                        className="
                            mt-5
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >
                        Try Again
                    </button>

                </div>

            </div>

        );

    }


    // ========================================
    // No Problems
    // ========================================

    if (!currentProblem) {

        return (

            <div
                className="
                    coding-round-page
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                    px-4
                "
            >

                <div
                    className="
                        text-center
                    "
                >

                    <Code2
                        size={40}
                        className="
                            mx-auto
                            text-slate-400
                        "
                    />

                    <h2
                        className="
                            mt-4
                            text-xl
                            font-semibold
                            text-slate-900
                            dark:text-white
                        "
                    >
                        No Coding Problems
                    </h2>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        No coding problems are available yet.
                    </p>

                </div>

            </div>

        );

    }


    const examples =
        getExamples();


    // ========================================
    // Main UI
    // ========================================

    return (

        <div className="coding-round-page">

            <div className="mx-auto w-full max-w-[1600px]">

                {/* ========================================
                    Header
                ======================================== */}

                <header
                    className="
                        coding-round-header
                        flex
                        flex-col
                        gap-4

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    {/* Title */}

                    <div className="min-w-0">

                        <div className="flex items-center gap-3">

                            <div className="coding-round-header-icon">

                                <Code2 size={22} />

                            </div>


                            <div className="min-w-0">

                                <h1 className="coding-round-title">
                                    Coding Round
                                </h1>

                                <p className="coding-round-subtitle">
                                    Test your problem-solving and coding skills.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Timer */}

                    <div
    className={`
        coding-round-timer
        w-full
        justify-center
        sm:w-auto
        ${
            timeExpired
                ? "border-red-500/50 text-red-500"
                : ""
        }
    `}
>
    <Clock size={18} />

    <span>
        {timeExpired
            ? "Time's Up"
            : formattedTime}
    </span>
</div>

                </header>


                {/* ========================================
                    Main Coding Area
                ======================================== */}

                <div
                    className="
                        mt-5
                        grid
                        grid-cols-1
                        gap-5

                        sm:mt-6

                        lg:gap-6

                        xl:grid-cols-[minmax(320px,0.85fr)_minmax(500px,1.15fr)]
                    "
                >

                    {/* ========================================
                        LEFT - Problem
                    ======================================== */}

                    <section className="coding-problem-panel">

                        {/* Problem Header */}

                        <div
                            className="
                                coding-panel-header
                                flex
                                flex-col
                                gap-3

                                sm:flex-row
                                sm:items-start
                                sm:justify-between
                            "
                        >

                            <div className="min-w-0">

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-2
                                    "
                                >

<span className="coding-problem-number">
    Problem{" "}
    {problems.findIndex(
        (problem) =>
            problem.id === currentProblem.id
    ) + 1}
</span>

                                    <span className="coding-difficulty easy">
                                        {currentProblem.difficulty}
                                    </span>

                                </div>


                                <h2 className="coding-problem-title">
                                    {currentProblem.title}
                                </h2>

                            </div>


                            <span
                                className="
                                    coding-question-count
                                    self-start

                                    sm:self-auto
                                "
                            >
                               {problems.findIndex(
    (problem) =>
        problem.id === currentProblem.id
) + 1}{" "}
/ {problems.length}
                            </span>

                        </div>


                        {/* Problem Content */}

                        <div className="coding-problem-content">

                            {/* Description */}

                            <div>

                                <h3 className="coding-section-title">
                                    Problem
                                </h3>


                                <p className="coding-problem-description">
                                    {currentProblem.description}
                                </p>

                            </div>


                            {/* Category */}

                            {currentProblem.category && (

                                <div>

                                    <h3 className="coding-section-title">
                                        Category
                                    </h3>

                                    <span className="coding-problem-number">
                                        {currentProblem.category}
                                    </span>

                                </div>

                            )}


                            {/* Examples */}

                            {examples.length > 0 && (

                                <div>

                                    <h3 className="coding-section-title">
                                        Example
                                    </h3>


                                    <div className="coding-example-box">

                                        {examples.map(
                                            (example, index) => (

                                                <div
                                                    key={index}
                                                >

                                                    <span className="coding-example-label">
                                                        Example {index + 1}
                                                    </span>


                                                    <div className="mt-2">

                                                        <span className="coding-example-label">
                                                            Input
                                                        </span>

                                                        <code>
                                                            {example.input}
                                                        </code>

                                                    </div>


                                                    <div className="mt-2">

                                                        <span className="coding-example-label">
                                                            Output
                                                        </span>

                                                        <code>
                                                            {example.output}
                                                        </code>

                                                    </div>


                                                    {example.explanation && (

                                                        <div className="mt-2">

                                                            <span className="coding-example-label">
                                                                Explanation
                                                            </span>

                                                            <p>
                                                                {example.explanation}
                                                            </p>

                                                        </div>

                                                    )}

                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            )}


                            {/* Constraints */}

                            {currentProblem.constraints && (

                                <div>

                                    <h3 className="coding-section-title">
                                        Constraints
                                    </h3>


                                    <div
                                        className="
                                            whitespace-pre-line
                                            text-sm
                                            leading-7
                                            text-slate-400
                                        "
                                    >
                                        {currentProblem.constraints}
                                    </div>

                                </div>

                            )}


                            {/* Hint */}

                            <div className="coding-hint">

                                <div className="coding-hint-icon">

                                    <Lightbulb size={18} />

                                </div>


                                <div className="min-w-0">

                                    <h3>
                                        Hint
                                    </h3>

                                    <p>
                                        Think about the most efficient
                                        approach before writing your code.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div
    className="
        mt-6
        flex
        flex-col
        gap-3
        border-t
        border-slate-800
        pt-5

        sm:flex-row
        sm:items-center
        sm:justify-between
    "
>

    <button
        type="button"
        onClick={handlePreviousProblem}
        disabled={
            problems.findIndex(
                (problem) =>
                    problem.id === currentProblem.id
            ) === 0
        }
        className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-700
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-300
            transition

            hover:border-slate-600
            hover:bg-slate-800
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-40

            sm:w-auto
        "
    >

        <ChevronLeft size={17} />

        Previous

    </button>


    <span
        className="
            text-center
            text-xs
            text-slate-500
        "
    >
        Problem{" "}
        {problems.findIndex(
            (problem) =>
                problem.id === currentProblem.id
        ) + 1}{" "}
        of {problems.length}
    </span>


    <button
        type="button"
        onClick={handleNextProblem}
        disabled={
            problems.findIndex(
                (problem) =>
                    problem.id === currentProblem.id
            ) === problems.length - 1
        }
        className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-blue-700

            disabled:cursor-not-allowed
            disabled:opacity-40

            sm:w-auto
        "
    >

        Next

        <ChevronRight size={17} />

    </button>

</div>

                    </section>


                    {/* ========================================
                        RIGHT - Code Editor
                    ======================================== */}

                    <section className="coding-editor-panel">

                        {/* Editor Header */}

                        <div
                            className="
                                coding-editor-header
                                flex
                                flex-col
                                gap-3

                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div className="coding-editor-icon">

                                    <Code2 size={18} />

                                </div>


                                <div>

                                    <p className="coding-editor-heading">
                                        Code Editor
                                    </p>

                                    <p className="coding-editor-language-label">
                                        Write your solution
                                    </p>

                                </div>

                            </div>


                            {/* Language */}

                            <div className="relative">

                                <select
                                    value={language}
                                    onChange={
                                        handleLanguageChange
                                    }
                                    className="
                                        coding-language-button
                                        w-full
                                        cursor-pointer
                                        appearance-none
                                        pr-9

                                        sm:w-auto
                                    "
                                >

                                    <option value="javascript">
                                        JavaScript
                                    </option>

                                    <option value="python">
                                        Python
                                    </option>

                                    <option value="java">
                                        Java
                                    </option>

                                    <option value="cpp">
                                        C++
                                    </option>

                                </select>


                                <ChevronDown
                                    size={16}
                                    className="
                                        pointer-events-none
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-slate-500
                                    "
                                />

                            </div>

                        </div>


                        {/* Editor */}

                        <div className="coding-editor-wrapper">

                            <div
                                className="
                                    coding-editor-topbar
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <span>
                                    solution.
                                    {language === "javascript"
                                        ? "js"
                                        : language === "python"
                                            ? "py"
                                            : language === "java"
                                                ? "java"
                                                : "cpp"
                                    }
                                </span>


                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="coding-reset-button"
                                >

                                    <RotateCcw size={15} />

                                    <span>
                                        Reset
                                    </span>

                                </button>

                            </div>


                            {/* Monaco Editor */}

                            <div className="coding-editor-area">

                                <Editor
                                    height="430px"
                                    language={language}
                                    value={code}
                                    onChange={(value) =>
                                        setCode(value || "")
                                    }
                                    theme={
                                        theme === "light"
                                            ? "vs-light"
                                            : "vs-dark"
                                    }
                                    options={{
                                        minimap: {
                                            enabled: false,
                                        },

                                        fontSize: 14,

                                        lineNumbers: "on",

                                        automaticLayout: true,

                                        wordWrap: "on",

                                        scrollBeyondLastLine: false,

                                        padding: {
                                            top: 16,
                                            bottom: 16,
                                        },

                                        tabSize: 4,

                                        fontFamily:
                                            "'Fira Code', 'Cascadia Code', Consolas, monospace",

                                        renderWhitespace:
                                            "selection",

                                        smoothScrolling:
                                            true,

                                        cursorBlinking:
                                            "smooth",

                                        bracketPairColorization: {
                                            enabled: true,
                                        },
                                    }}
                                />

                            </div>

                        </div>


                        {/* Test Cases */}

                        <div className="coding-output-section">

                            <div
                                className="
                                    coding-output-header
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div className="flex items-center gap-2">

                                    <Terminal size={17} />

                                    <span>
                                        Test Cases
                                    </span>

                                </div>


                                <span className="coding-test-status">
                                    Ready
                                </span>

                            </div>


                            {/* Test Case Tabs */}

                            <div
    className="
        coding-test-cases
        flex
        gap-2
        overflow-x-auto
    "
>

    {testCasesLoading ? (

        <span className="text-xs text-slate-500">
            Loading test cases...
        </span>

    ) : testCases.length > 0 ? (

        testCases.map((testCase, index) => (

            <button
                key={testCase.id}
                type="button"
                onClick={() =>
                    setSelectedTestCase(index)
                }
                className={`
                    coding-test-case
                    shrink-0
                    ${
                        selectedTestCase === index
                            ? "active"
                            : ""
                    }
                `}
            >

                <div className="flex items-center gap-2">

                    <span className="coding-test-dot" />

                    <span>
                        Test Case {index + 1}
                    </span>

                </div>


                {selectedTestCase === index && (

                    <CheckCircle2
                        size={17}
                        className="coding-test-check"
                    />

                )}

            </button>

        ))

    ) : (

        <span className="text-xs text-slate-500">
            No visible test cases available.
        </span>

    )}

</div>

                            {/* Output */}

                            <div className="coding-output-box">

{!executionResult ? (

    <p className="coding-output-placeholder">
        Run your code to see the output here.
    </p>

) : executionResult.submission ? (

    <div className="space-y-4">

        <div
            className={
                executionResult.accepted
                    ? "coding-result-success"
                    : "coding-result-error"
            }
        >

            <div className="flex items-center gap-2">

                <CheckCircle2 size={18} />

                <span>
                    {executionResult.message}
                </span>

            </div>

        </div>


        <div className="text-sm text-slate-400">

            Tests Passed:{" "}

            <span className="font-semibold text-white">
                {executionResult.passedTests}
            </span>

            {" / "}

            {executionResult.totalTests}

        </div>


        {executionResult.results?.map(
            (result) => (

                <div
                    key={result.testCase}
                    className="
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        border
                        border-slate-800
                        px-3
                        py-2
                    "
                >

                    <span className="text-sm text-slate-300">
                        Test Case {result.testCase}

                        {result.hidden && (
                            <span className="ml-2 text-xs text-slate-500">
                                Hidden
                            </span>
                        )}
                    </span>


                    <span
                        className={
                            result.passed
                                ? "text-sm text-green-400"
                                : "text-sm text-red-400"
                        }
                    >
                        {result.passed
                            ? "Passed"
                            : result.status?.description ||
                              "Failed"}
                    </span>

                </div>

            )
        )}

    </div>

) : (

    <div className="space-y-4">

        <div
            className="
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-300
            "
        >

            <span>
                {executionResult.status?.description ||
                    "Execution Result"}
            </span>

        </div>


        {executionResult.stdout && (

            <div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Output
                </p>

                <pre
                    className="
                        overflow-x-auto
                        rounded-lg
                        bg-slate-950
                        p-3
                        text-sm
                        text-green-400
                    "
                >
                    {executionResult.stdout}
                </pre>

            </div>

        )}


        {(executionResult.stderr ||
            executionResult.compileOutput) && (

            <pre
                className="
                    overflow-x-auto
                    rounded-lg
                    bg-red-500/5
                    p-3
                    text-sm
                    text-red-400
                "
            >
                {executionResult.stderr ||
                    executionResult.compileOutput}
            </pre>

        )}

    </div>

)}

</div>

                        </div>


                        {/* Actions */}

                        <div
                            className="
                                coding-actions
                                flex
                                flex-col
                                gap-3

                                sm:flex-row
                                sm:justify-end
                            "
                        >

<button
    type="button"
    onClick={handleRunCode}
    disabled={
        isRunning ||
        isSubmitting ||
        timeExpired
    }
    className="coding-run-button"
>
    <Play
        size={17}
        className={
            isRunning
                ? "animate-spin"
                : ""
        }
    />

    {isRunning
        ? "Running..."
        : "Run Code"}
</button>


<button
    type="button"
    onClick={handleSubmitCode}
    disabled={isRunning || isSubmitting || timeExpired}
    className="coding-submit-button"
>
    <Send size={17} />

    {isSubmitting
        ? "Submitting..."
        : "Submit Solution"}
</button>

                        </div>

                    </section>

                </div>


                {/* ========================================
                    Bottom Info
                ======================================== */}

                <div
                    className="
                        coding-round-footer
                        flex
                        flex-col
                        items-start
                        gap-2

                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    "
                >

                    <div className="flex items-center gap-2">

                        <CheckCircle2 size={17} />

                        <span>
                            Your progress is automatically saved.
                        </span>

                    </div>


                    <span>
                        {problems.length} Questions
                    </span>

                </div>

            </div>

        </div>

    );
}

export default CodingRound;