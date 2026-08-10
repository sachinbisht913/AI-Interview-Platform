// File: src/pages/InterviewReport.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReportHero from "../components/interview/ReportHero";
import OverallFeedback from "../components/interview/OverallFeedback";
import QuestionFeedback from "../components/interview/QuestionFeedback";
import ReportActions from "../components/interview/ReportActions";

import { generateInterviewPDF } from "../utils/pdfGenerator";
import { getInterviewReport } from "../api/historyApi";

function InterviewReport() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            setError("Invalid interview ID.");
            setLoading(false);
            return;
        }

        fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            setLoading(true);
            setError("");

            const { data } = await getInterviewReport(id);

            setReport(data?.report || []);
        } catch (error) {
            console.error("Failed to load interview report:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load interview report."
            );
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
                    min-h-screen
                    bg-slate-950
                    px-4
                    flex
                    items-center
                    justify-center
                    text-white
                "
            >
                <div className="text-center">

                    <div
                        className="
                            mx-auto
                            mb-4
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-slate-700
                            border-t-blue-500
                        "
                    />

                    <p className="text-sm text-slate-400 sm:text-base">
                        Loading Report...
                    </p>

                </div>
            </div>
        );
    }

    // ========================================
    // Error / Empty State
    // ========================================

    if (error || report.length === 0) {
        return (
            <div
                className="
                    min-h-screen
                    bg-slate-950
                    px-4
                    flex
                    items-center
                    justify-center
                    text-white
                "
            >
                <div className="max-w-md text-center">

                    <h2 className="text-xl font-semibold sm:text-2xl">
                        {error || "Report not found."}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500 sm:text-base">
                        We couldn't find the requested interview report.
                    </p>

                </div>
            </div>
        );
    }

    const interview = report[0];

    return (
        <div
            className="
                min-h-screen
                bg-slate-950
                px-4
                py-8

                sm:px-6
                sm:py-10

                lg:px-8
                lg:py-14
            "
        >
            <div
                className="
                    mx-auto
                    w-full
                    max-w-6xl
                    space-y-6

                    sm:space-y-8

                    lg:space-y-10
                "
            >

                {/* ========================================
                    Report Hero
                ======================================== */}

                <ReportHero
                    domain={interview.domain}
                    difficulty={interview.difficulty}
                    overallScore={interview.overall_score}
                />


                {/* ========================================
                    Overall Feedback
                ======================================== */}

                <OverallFeedback
                    feedback={interview.overall_feedback}
                />


                {/* ========================================
                    Question Feedback
                ======================================== */}

                <div
                    className="
                        space-y-5
                        sm:space-y-6
                        lg:space-y-8
                    "
                >
                    {report.map((item) => (
                        <QuestionFeedback
                            key={item.id}
                            item={{
                                ...item,

                                evaluation: {
                                    score: item.score,
                                    feedback: item.feedback,
                                },
                            }}
                        />
                    ))}
                </div>


                {/* ========================================
                    Actions
                ======================================== */}

                <ReportActions
                    onDownload={() =>
                        generateInterviewPDF(report)
                    }
                />

            </div>
        </div>
    );
}

export default InterviewReport;