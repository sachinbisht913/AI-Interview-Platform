// File: src/pages/ResumeHistory.jsx

import { useEffect, useState } from "react";

import ResumeHistoryCard from "../components/resume/ResumeHistoryCard";

import { getResumeHistory } from "../api/resumeHistoryApi";

function ResumeHistory() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const { data } = await getResumeHistory();

            setResumes(data.resumes);
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
                    resume-history-page
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-4
                    text-center
                "
            >
                <p
                    className="
                        resume-history-muted
                        text-sm
                        sm:text-base
                    "
                >
                    Loading Resume History...
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                resume-history-page
                min-h-screen
                px-4
                py-8
                sm:px-6
                sm:py-10
                lg:px-8
                lg:py-12
            "
        >
            <div className="mx-auto w-full max-w-7xl">

                {/* Header */}

                <div>
                    <h1
                        className="
                            resume-history-title
                            text-3xl
                            font-bold
                            sm:text-4xl
                        "
                    >
                        Resume History
                    </h1>

                    <p
                        className="
                            resume-history-muted
                            mt-2
                            max-w-2xl
                            text-sm
                            leading-6
                            sm:text-base
                            sm:leading-7
                        "
                    >
                        View all uploaded resumes and AI analysis.
                    </p>
                </div>

                {/* Resume History */}

                <div
                    className="
                        mt-8
                        space-y-4
                        sm:mt-10
                        sm:space-y-6
                    "
                >
                    {resumes.length === 0 ? (
                        <div
                            className="
                                resume-history-empty
                                rounded-3xl
                                border
                                border-dashed
                                px-4
                                py-16
                                text-center
                                text-sm
                                sm:py-20
                                sm:text-base
                            "
                        >
                            No resumes uploaded.
                        </div>
                    ) : (
                        resumes.map((resume) => (
                            <ResumeHistoryCard
                                key={resume.id}
                                resume={resume}
                            />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default ResumeHistory;