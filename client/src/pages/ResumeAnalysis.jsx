// File: src/pages/ResumeAnalysis.jsx

import { useLocation, useNavigate } from "react-router-dom";

import ScoreCard from "../components/resume/ScoreCard";
import SectionCard from "../components/resume/SectionCard";
import SkillBadge from "../components/resume/SkillBadge";
import QuestionCard from "../components/resume/QuestionCard";
import GlassCard from "../components/common/GlassCard";

function ResumeAnalysis() {

    const location = useLocation();
    const navigate = useNavigate();

    const analysis = location.state?.analysis;


    if (!analysis) {

        return (

            <div
                className="
                    resume-analysis-page
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-slate-900
                    px-4
                "
            >

                <button
                    onClick={() => navigate("/resume")}
                    className="
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700

                        sm:px-6
                        sm:text-base
                    "
                >
                    Upload Resume
                </button>

            </div>

        );

    }


    return (

        <div
            className="
                resume-analysis-page
                min-h-screen
                bg-slate-900
                px-4
                py-8

                sm:px-6
                sm:py-10

                lg:px-8
                lg:py-12
            "
        >

            <div className="mx-auto w-full max-w-7xl">


                {/* =====================================
                    Scores
                ===================================== */}

                <div
                    className="
                        mb-8
                        grid
                        grid-cols-1
                        gap-4

                        sm:grid-cols-2
                        sm:gap-6

                        lg:mb-10
                    "
                >

                    <ScoreCard
                        title="ATS Score"
                        score={analysis.atsScore}
                    />

                    <ScoreCard
                        title="Grammar Score"
                        score={analysis.grammarScore}
                    />

                </div>


                {/* =====================================
                    Strengths & Weaknesses
                ===================================== */}

                <div
                    className="
                        mb-8
                        grid
                        grid-cols-1
                        gap-6

                        md:grid-cols-2

                        lg:mb-10
                        lg:gap-8
                    "
                >

                    <SectionCard
                        title="Strengths"
                        items={analysis.strengths}
                        color="text-green-400"
                    />

                    <SectionCard
                        title="Weaknesses"
                        items={analysis.weaknesses}
                        color="text-red-400"
                    />

                </div>


                {/* =====================================
                    Missing Skills
                ===================================== */}

                <GlassCard
                    className="
                        resume-missing-skills
                        mb-8
                        p-5

                        sm:p-6

                        lg:mb-10
                        lg:p-8
                    "
                >

                    <h2
                        className="
                            resume-missing-title
                            mb-6
                            text-2xl
                            font-bold
                            text-yellow-400

                            sm:mb-8
                            sm:text-3xl
                        "
                    >
                        Missing Skills
                    </h2>


                    <div className="flex flex-wrap gap-3 sm:gap-4">

                        {analysis.missingSkills?.map(
                            (skill, index) => (

                                <SkillBadge
                                    key={index}
                                    skill={skill}
                                />

                            )
                        )}

                    </div>

                </GlassCard>


                {/* =====================================
                    Interview Questions
                ===================================== */}

                <GlassCard
                    className="
                        resume-questions
                        p-5

                        sm:p-6

                        lg:p-8
                    "
                >

                    <h2
                        className="
                            resume-questions-title
                            mb-6
                            text-2xl
                            font-bold
                            text-white

                            sm:mb-8
                            sm:text-3xl
                        "
                    >
                        Interview Questions
                    </h2>


                    <div className="space-y-4 sm:space-y-6">

                        {analysis.interviewQuestions?.map(
                            (question, index) => (

                                <QuestionCard
                                    key={index}
                                    question={question}
                                />

                            )
                        )}

                    </div>

                </GlassCard>

            </div>

        </div>

    );
}

export default ResumeAnalysis;