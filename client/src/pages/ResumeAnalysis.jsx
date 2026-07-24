import { useLocation, useNavigate } from "react-router-dom";

import ScoreCard from "../components/resume/ScoreCard";
import SectionCard from "../components/resume/SectionCard";
import SkillBadge from "../components/resume/SkillBadge";
import QuestionCard from "../components/resume/QuestionCard";
import PageHeader from "../components/layout/PageHeader";
import GlassCard from "../components/common/GlassCard";
function ResumeAnalysis() {

    const location = useLocation();
    const navigate = useNavigate();

    const analysis = location.state?.analysis;

    if (!analysis) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">

                <button
                    onClick={() => navigate("/resume")}
                    className="bg-blue-600 px-6 py-3 rounded-lg text-white"
                >
                    Upload Resume
                </button>

            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-900 p-10">

<PageHeader
    title="Resume Analysis"
    subtitle="AI-powered insights from your uploaded resume."
/>

            {/* Scores */}

            <div className="grid grid-cols-2 gap-6 mb-10">

                <ScoreCard
                    title="ATS Score"
                    score={analysis.atsScore}
                />

                <ScoreCard
                    title="Grammar Score"
                    score={analysis.grammarScore}
                />

            </div>

            {/* Strengths & Weaknesses */}

            <div className="grid md:grid-cols-2 gap-8 mb-10">

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

            {/* Missing Skills */}

            <GlassCard className="p-8 mb-10">

    <h2 className="text-3xl text-yellow-400 font-bold mb-8">
        Missing Skills
    </h2>

    <div className="flex flex-wrap gap-4">

        {analysis.missingSkills?.map((skill, index) => (

            <SkillBadge
                key={index}
                skill={skill}
            />

        ))}

    </div>

</GlassCard>

            {/* Interview Questions */}

            <GlassCard className="p-8">

<h2 className="text-3xl text-blue-400 font-bold mb-8">

    Interview Questions

</h2>

<div className="space-y-4">

    {analysis.interviewQuestions?.map((question, index) => (

        <QuestionCard
            key={index}
            question={question}
        />

    ))}

</div>

</GlassCard>

        </div>


    );

}

export default ResumeAnalysis;