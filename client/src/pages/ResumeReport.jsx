// File: src/pages/ResumeReport.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getResumeReport } from "../api/resumeHistoryApi";

import {
    FileText,
    CalendarDays,
    Award,
    CheckCircle2,
    AlertTriangle,
    Briefcase,
    MessageSquare,
    BookOpen,
    Sparkles,
} from "lucide-react";

function ResumeReport() {
    const { id } = useParams();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const { data } = await getResumeReport(id);

            setReport(data.report);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // Loading
    // ========================================

    if (loading) {
        return (
            <div
                className="
                    resume-report-page
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-4
                    text-center
                "
            >
                <p className="resume-report-muted text-sm sm:text-base">
                    Loading Resume Report...
                </p>
            </div>
        );
    }

    // ========================================
    // Report Not Found
    // ========================================

    if (!report) {
        return (
            <div
                className="
                    resume-report-page
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-4
                    text-center
                "
            >
                <p className="resume-report-muted text-sm sm:text-base">
                    Report not found.
                </p>
            </div>
        );
    }

    // ========================================
    // Parse JSON Fields
    // ========================================

    const parseField = (value) => {
        if (!value) return [];

        try {
            return JSON.parse(value);
        } catch {
            return [value];
        }
    };

    return (
        <div
            className="
                resume-report-page
                min-h-screen
                px-4
                py-8
                sm:px-6
                sm:py-10
                lg:px-8
                lg:py-12
            "
        >
            <div className="mx-auto w-full max-w-6xl">

                {/* ========================================
                    Header
                ======================================== */}

                <div
                    className="
                        resume-report-hero
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        p-5
                        sm:p-8
                    "
                >
                    <div className="relative z-10">

                        <div className="flex items-start gap-3">

                            <FileText
                                className="
                                    mt-1
                                    shrink-0
                                    text-blue-400
                                "
                                size={28}
                            />

                            <h1
                                className="
                                    resume-report-title
                                    text-2xl
                                    font-bold
                                    leading-tight
                                    sm:text-3xl
                                    lg:text-4xl
                                "
                            >
                                Resume Analysis Report
                            </h1>

                        </div>

                        <p
                            className="
                                resume-report-file-name
                                mt-4
                                break-words
                                text-sm
                                sm:text-base
                            "
                        >
                            {report.file_name}
                        </p>

                        <div
                            className="
                                resume-report-muted
                                mt-3
                                flex
                                items-center
                                gap-2
                                text-sm
                            "
                        >
                            <CalendarDays
                                size={18}
                                className="shrink-0"
                            />

                            <span>
                                {new Date(
                                    report.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>

                    </div>

                    <Sparkles
                        size={55}
                        className="
                            absolute
                            right-4
                            top-4
                            text-blue-500/20
                            sm:right-8
                            sm:top-8
                            sm:h-[70px]
                            sm:w-[70px]
                        "
                    />

                </div>


                {/* ========================================
                    Scores
                ======================================== */}

                <div
                    className="
                        mt-6
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                        sm:gap-6
                        lg:mt-8
                    "
                >

                    <ScoreCard
                        title="ATS Score"
                        value={report.ats_score}
                        color="text-blue-400"
                    />

                    <ScoreCard
                        title="Grammar Score"
                        value={report.grammar_score}
                        color="text-emerald-400"
                    />

                </div>


                {/* ========================================
                    Strengths
                ======================================== */}

                <Section
                    title="Strengths"
                    data={parseField(report.strengths)}
                />


                {/* ========================================
                    Weaknesses
                ======================================== */}

                <Section
                    title="Weaknesses"
                    data={parseField(report.weaknesses)}
                />


                {/* ========================================
                    Missing Skills
                ======================================== */}

                <Section
                    title="Missing Skills"
                    data={parseField(report.missing_skills)}
                />


                {/* ========================================
                    Project Suggestions
                ======================================== */}

                <Section
                    title="Project Suggestions"
                    data={parseField(report.project_suggestions)}
                />


                {/* ========================================
                    Interview Questions
                ======================================== */}

                <Section
                    title="Interview Questions"
                    data={parseField(report.interview_questions)}
                />


                {/* ========================================
                    Learning Path
                ======================================== */}

                <Section
                    title="Learning Path"
                    data={parseField(report.learning_path)}
                />

            </div>
        </div>
    );
}


// ======================================================
// Score Card
// ======================================================

function ScoreCard({ title, value, color }) {
    return (
        <div
            className="
                resume-report-card
                rounded-3xl
                border
                p-5
                transition
                hover:border-blue-500/30
                sm:p-8
            "
        >
            <div className="flex items-center justify-between gap-4">

                <h3
                    className="
                        resume-report-muted
                        text-sm
                        font-medium
                        sm:text-base
                    "
                >
                    {title}
                </h3>

                <Award
                    className={`${color} shrink-0`}
                    size={22}
                />

            </div>


            <div className="mt-5 flex items-end gap-2 sm:mt-6">

                <h2
                    className={`
                        text-4xl
                        font-bold
                        sm:text-5xl
                        lg:text-6xl
                        ${color}
                    `}
                >
                    {value}
                </h2>

                <span
                    className="
                        resume-report-score-label
                        mb-1
                        text-sm
                        sm:text-base
                    "
                >
                    /100
                </span>

            </div>

        </div>
    );
}


// ======================================================
// Section
// ======================================================

function Section({ title, data }) {

    const icons = {
        Strengths: CheckCircle2,
        Weaknesses: AlertTriangle,
        "Missing Skills": AlertTriangle,
        "Project Suggestions": Briefcase,
        "Interview Questions": MessageSquare,
        "Learning Path": BookOpen,
    };

    const Icon = icons[title] || CheckCircle2;

    return (
        <section
            className="
                resume-report-card
                mt-6
                rounded-3xl
                border
                p-5
                sm:mt-8
                sm:p-8
            "
        >

            {/* Section Header */}

            <div
                className="
                    mb-6
                    flex
                    items-center
                    gap-3
                    sm:mb-8
                "
            >

                <Icon
                    className="shrink-0 text-blue-400"
                    size={22}
                />

                <h2
                    className="
                        resume-report-title
                        text-xl
                        font-bold
                        sm:text-2xl
                    "
                >
                    {title}
                </h2>

            </div>


            {/* Items */}

            <div className="space-y-3 sm:space-y-4">

                {data.map((item, index) => (

                    <div
                        key={index}
                        className="
                            resume-report-item
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            border
                            p-4
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:border-blue-500/50
                            sm:gap-4
                            sm:p-5
                        "
                    >

                        <CheckCircle2
                            className="
                                mt-1
                                shrink-0
                                text-emerald-400
                            "
                            size={18}
                        />

                        <p
                            className="
                                resume-report-item-text
                                min-w-0
                                break-words
                                text-sm
                                leading-6
                                sm:text-base
                                sm:leading-7
                            "
                        >
                            {item}
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default ResumeReport;