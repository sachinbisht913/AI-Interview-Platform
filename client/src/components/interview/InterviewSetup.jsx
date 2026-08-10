// File: src/components/interview/InterviewSetup.jsx

import { useState } from "react";

import DomainCard from "./DomainCard";
import DifficultySelector from "./DifficultySelector";
import QuestionSelector from "./QuestionSelector";
import StartInterviewButton from "./StartInterviewButton";

function InterviewSetup() {

    const [domain, setDomain] = useState("React");
    const [difficulty, setDifficulty] = useState("Medium");
    const [questions, setQuestions] = useState(5);

    return (

        <div
            className="
                w-full
                max-w-5xl
                mx-auto
                px-4
                py-8

                sm:px-6
                sm:py-10

                lg:py-12
            "
        >

            {/* Header */}

            <div className="mb-8 sm:mb-10">

                <h1
                    className="
                        interview-setup-title
                        text-3xl
                        font-bold

                        sm:text-4xl
                    "
                >
                    AI Mock Interview
                </h1>

                <p
                    className="
                        interview-setup-description
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-6

                        sm:text-base
                        sm:leading-7
                    "
                >
                    Configure your interview session. You'll receive
                    AI-generated questions, detailed feedback, performance
                    analysis and a complete interview report after completion.
                </p>

            </div>


            {/* Configuration */}

            <div
                className="
                    interview-setup-card
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-5

                    sm:p-6

                    lg:p-8
                "
            >

                <h2
                    className="
                        interview-setup-heading
                        mb-6
                        text-lg
                        font-semibold

                        sm:text-xl
                    "
                >
                    Interview Configuration
                </h2>


                <div className="space-y-6 sm:space-y-8">

                    <DomainCard
                        domain={domain}
                        setDomain={setDomain}
                    />

                    <DifficultySelector
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                    />

                    <QuestionSelector
                        questions={questions}
                        setQuestions={setQuestions}
                    />

                </div>


                {/* Interview Information */}

                <div
                    className="
                        interview-info-section
                        mt-8
                        border-t
                        border-slate-800
                        pt-6

                        sm:mt-10
                        sm:pt-8
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-4

                            sm:grid-cols-2
                            sm:gap-5

                            md:grid-cols-3

                            lg:gap-6
                        "
                    >

                        <InfoCard
                            title="Estimated Time"
                            value={`${questions * 2} Minutes`}
                        />

                        <InfoCard
                            title="Evaluation"
                            value="AI Powered"
                        />

                        <InfoCard
                            title="Report"
                            value="Detailed Analysis"
                        />

                    </div>

                </div>


                {/* Start Interview */}

                <div className="mt-8 sm:mt-10">

                    <StartInterviewButton
                        domain={domain}
                        difficulty={difficulty}
                        questions={questions}
                    />

                </div>

            </div>

        </div>

    );
}


function InfoCard({ title, value }) {

    return (

        <div
            className="
                interview-info-card
                rounded-2xl
                border
                border-slate-800
                bg-slate-950
                p-4

                sm:p-5
            "
        >

            <p
                className="
                    interview-info-label
                    text-xs

                    sm:text-sm
                "
            >
                {title}
            </p>

            <h3
                className="
                    interview-info-value
                    mt-2
                    break-words
                    text-base
                    font-semibold

                    sm:text-lg
                "
            >
                {value}
            </h3>

        </div>

    );
}

export default InterviewSetup;