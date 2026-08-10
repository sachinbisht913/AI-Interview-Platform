// File: src/pages/InterviewSession.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, Clock, LogOut } from "lucide-react";

import { submitAnswer } from "../api/interviewApi";

function InterviewSession() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const interview = state?.interview;
    const interviewId = state?.interviewId;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [submitting, setSubmitting] = useState(false);


    /*
    ========================================
    Interview Data
    ========================================
    */

    const questions = interview?.questions || [];

    const question = questions[currentQuestion];


    /*
    ========================================
    Timer
    ========================================
    */

    const TOTAL_TIME = questions.length * 120;

    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);


    /*
    ========================================
    Finish Interview
    ========================================
    */

    const finishInterview = useCallback(async () => {

        if (submitting || !question) return;

        setSubmitting(true);

        try {

            if (answer.trim()) {

                await submitAnswer({

                    interviewId,

                    questionNo: currentQuestion + 1,

                    topic: question.topic,

                    question: question.question,

                    expectedAnswer: question.expectedAnswer,

                    userAnswer: answer,

                });

            }

        } catch (error) {

            console.log(error);

        }

        navigate("/interview-result", {

            state: {
                interviewId,
            },

        });

    }, [
        submitting,
        answer,
        interviewId,
        currentQuestion,
        question,
        navigate,
    ]);


    /*
    ========================================
    Countdown Timer
    ========================================
    */

    useEffect(() => {

        if (!interview || submitting || timeLeft <= 0) {
            return;
        }

        const interval = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(interval);

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(interval);

    }, [
        interview,
        submitting,
        timeLeft,
    ]);


    /*
    ========================================
    Auto Submit
    ========================================
    */

    useEffect(() => {

        if (
            interview &&
            timeLeft <= 0 &&
            !submitting
        ) {

            finishInterview();

        }

    }, [
        interview,
        timeLeft,
        finishInterview,
        submitting,
    ]);


    /*
    ========================================
    Next Question
    ========================================
    */

    const handleNext = async () => {

        if (submitting || !question) return;

        try {

            setSubmitting(true);

            await submitAnswer({

                interviewId,

                questionNo: currentQuestion + 1,

                topic: question.topic,

                question: question.question,

                expectedAnswer: question.expectedAnswer,

                userAnswer: answer,

            });


            if (currentQuestion < questions.length - 1) {

                setCurrentQuestion((prev) => prev + 1);

                setAnswer("");

                setSubmitting(false);

            } else {

                navigate("/interview-result", {

                    state: {
                        interviewId,
                    },

                });

            }

        } catch (error) {

            console.log(error);

            setSubmitting(false);

        }

    };


    /*
    ========================================
    No Interview
    ========================================
    */

    if (!interview || !question) {

        return (

            <div
                className="
                    interview-session-page
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-slate-950
                    px-4
                "
            >

                <button
                    type="button"
                    onClick={() => navigate("/mock-interview")}
                    className="
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700

                        sm:text-base
                    "
                >
                    Start Interview
                </button>

            </div>

        );

    }


    /*
    ========================================
    Time Formatting
    ========================================
    */

    const minutes = String(
        Math.floor(timeLeft / 60)
    ).padStart(2, "0");

    const seconds = String(
        timeLeft % 60
    ).padStart(2, "0");


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;


    return (

        <div className="interview-session-page min-h-screen bg-slate-950">

            {/* ========================================
                Header
            ======================================== */}

            <header
                className="
                    interview-session-header
                    border-b
                    border-slate-800
                    bg-slate-900
                "
            >

                <div
                    className="
                        mx-auto
                        flex
                        max-w-7xl
                        flex-col
                        gap-4
                        px-4
                        py-4

                        sm:px-6
                        sm:py-5

                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >

                    {/* Title */}

                    <h1
                        className="
                            interview-session-title
                            text-xl
                            font-bold

                            sm:text-2xl

                            md:text-3xl
                        "
                    >
                        AI Mock Interview
                    </h1>


                    {/* Header Controls */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-4

                            sm:justify-end
                        "
                    >

                        {/* Timer */}

                        <div
                            className={`
                                interview-timer
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-slate-800
                                bg-slate-950
                                px-3
                                py-2
                                font-semibold

                                ${
                                    timeLeft <= 60
                                        ? "text-red-400 animate-pulse"
                                        : timeLeft <= 300
                                        ? "text-yellow-400"
                                        : "text-emerald-400"
                                }
                            `}
                        >

                            <Clock size={18} />

                            <span className="text-sm sm:text-base">
                                {minutes}:{seconds}
                            </span>

                        </div>


                        {/* Exit */}

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-red-500/40
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-red-400
                                transition
                                hover:bg-red-500
                                hover:text-white

                                sm:px-5
                            "
                        >

                            <LogOut size={17} />

                            <span>
                                Exit
                            </span>

                        </button>

                    </div>

                </div>

            </header>


            {/* ========================================
                Body
            ======================================== */}

            <main
                className="
                    mx-auto
                    w-full
                    max-w-5xl
                    px-4
                    py-8

                    sm:px-6
                    sm:py-10

                    lg:py-14
                "
            >

                {/* ========================================
                    Progress
                ======================================== */}

                <div className="mb-8 sm:mb-10">

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            justify-between
                            gap-4
                            text-sm

                            sm:text-base
                        "
                    >

                        <span className="interview-progress-text">
                            Question {currentQuestion + 1} /{" "}
                            {questions.length}
                        </span>

                        <span className="interview-progress-percent font-medium">
                            {Math.round(progress)}%
                        </span>

                    </div>


                    <div className="interview-progress-track h-2 w-full overflow-hidden rounded-full">

                        <div
                            className="
                                h-full
                                rounded-full
                                bg-blue-500
                                transition-all
                                duration-500
                            "
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>


                {/* ========================================
                    Question
                ======================================== */}

                <section
                    className="
                        interview-question-card
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-5
                        shadow-xl

                        sm:p-7

                        lg:p-10
                    "
                >

                    <p
                        className="
                            mb-4
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-blue-400

                            sm:text-sm
                        "
                    >
                        {question.topic}
                    </p>


                    <h2
                        className="
                            interview-question-text
                            text-2xl
                            font-bold
                            leading-relaxed

                            sm:text-3xl

                            lg:text-4xl
                        "
                    >
                        {question.question}
                    </h2>

                </section>


                {/* ========================================
                    Answer
                ======================================== */}

                <div className="mt-7 sm:mt-10">

                    <textarea
                        rows={8}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Write your answer here..."
                        className="
                            interview-answer
                            min-h-[220px]
                            w-full
                            resize-none
                            rounded-3xl
                            border
                            border-slate-700
                            bg-slate-900
                            p-5
                            text-sm
                            leading-7
                            outline-none
                            transition
                            placeholder:text-slate-600
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20

                            sm:p-6
                            sm:text-base
                        "
                    />


                    <div className="mt-2 flex justify-end">

                        <span className="interview-character-count text-xs sm:text-sm">
                            {answer.length} characters
                        </span>

                    </div>

                </div>


                {/* ========================================
                    Next Button
                ======================================== */}

                <div className="mt-6 flex justify-end sm:mt-8">

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!answer.trim() || submitting}
                        className={`
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-3
                            rounded-2xl
                            px-6
                            py-4
                            text-sm
                            font-semibold
                            transition-all

                            sm:w-auto
                            sm:px-8
                            sm:text-base

                            ${
                                answer.trim() && !submitting
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "cursor-not-allowed bg-slate-700 text-slate-400"
                            }
                        `}
                    >

                        {submitting
                            ? "Submitting..."
                            : currentQuestion === questions.length - 1
                            ? "Finish Interview"
                            : "Next Question"
                        }

                        {!submitting && (
                            <ArrowRight size={18} />
                        )}

                    </button>

                </div>

            </main>

        </div>

    );

}

export default InterviewSession;