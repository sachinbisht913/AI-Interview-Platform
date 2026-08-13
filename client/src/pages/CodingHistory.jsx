// File: src/pages/CodingHistory.jsx

import { useEffect, useMemo, useState } from "react";

import {
    Code2,
    CheckCircle2,
    XCircle,
    Clock3,
    Trophy,
    Target,
    ChevronRight,
    Loader2,
    AlertCircle,
    X,
    Copy,
} from "lucide-react";

import {
    getCodingSubmissions,
    getCodingSubmissionById,
} from "../api/codingSubmissionApi";




function CodingHistory() {

    // ========================================
    // State
    // ========================================

    const [submissions, setSubmissions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [selectedSubmission, setSelectedSubmission] =
        useState(null);

    const [detailsLoading, setDetailsLoading] =
        useState(false);

    const [copied, setCopied] =
        useState(false);


    // ========================================
    // Fetch Submissions
    // ========================================

    useEffect(() => {

        fetchSubmissions();

    }, []);


    const fetchSubmissions = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await getCodingSubmissions();

            const data =
                response.data;

            if (!data.success) {

                throw new Error(
                    data.message ||
                    "Failed to load coding history."
                );

            }

            setSubmissions(
                data.submissions || []
            );

        } catch (error) {

            console.error(
                "Coding History Error:",
                error
            );

            setError(
                error.apiMessage ||
                error.message ||
                "Failed to load coding history."
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // Statistics
    // ========================================

    const statistics = useMemo(() => {

        const total =
            submissions.length;

        const accepted =
            submissions.filter(
                (submission) =>
                    submission.status === "Accepted"
            ).length;

        const attemptedProblems =
            new Set(
                submissions.map(
                    (submission) =>
                        submission.problem_id
                )
            ).size;

        const successRate =
            total > 0
                ? Math.round(
                    (accepted / total) * 100
                )
                : 0;

        return {
            total,
            accepted,
            attemptedProblems,
            successRate,
        };

    }, [submissions]);


    // ========================================
    // Open Submission
    // ========================================

    const handleOpenSubmission = async (id) => {

        try {

            setDetailsLoading(true);
            setCopied(false);

            const response =
                await getCodingSubmissionById(id);

            if (response.data.success) {

                setSelectedSubmission(
                    response.data.submission
                );

            }

        } catch (error) {

            console.error(
                "Get Submission Error:",
                error
            );

        } finally {

            setDetailsLoading(false);

        }

    };


    // ========================================
    // Close Details
    // ========================================

    const handleCloseDetails = () => {

        setSelectedSubmission(null);
        setCopied(false);

    };


    // ========================================
    // Copy Code
    // ========================================

    const handleCopyCode = async () => {

        if (
            !selectedSubmission?.source_code
        ) {
            return;
        }

        try {

            await navigator.clipboard.writeText(
                selectedSubmission.source_code
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {

            console.error(
                "Copy Code Error:",
                error
            );

        }

    };


    // ========================================
    // Format Date
    // ========================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            undefined,
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        );

    };


    // ========================================
    // Status Icon
    // ========================================

    const getStatusIcon = (status) => {

        if (status === "Accepted") {

            return (
                <CheckCircle2 size={17} />
            );

        }

        return (
            <XCircle size={17} />
        );

    };


    // ========================================
    // Loading
    // ========================================

    if (loading) {

        return (

            <div className="coding-history-page">

                <div className="coding-history-loading">

                    <Loader2
                        size={32}
                        className="
                            coding-history-loading-icon
                            animate-spin
                        "
                    />

                    <p>
                        Loading coding history...
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

            <div className="coding-history-page">

                <div className="coding-history-error-wrapper">

                    <div className="coding-history-error">

                        <AlertCircle
                            size={32}
                            className="coding-history-error-icon"
                        />

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchSubmissions}
                            className="coding-history-retry-button"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // ========================================
    // Main UI
    // ========================================

    return (

        <div className="coding-history-page">

            <div className="coding-history-container">

                {/* ========================================
                    Header
                ======================================== */}

                <div className="coding-history-header">

                    <div className="coding-history-heading">

                        <div className="coding-history-heading-icon">

                            <Code2 size={22} />

                        </div>

                        <div>

                            <h1>
                                Coding History
                            </h1>

                            <p>
                                Review your coding submissions
                                and performance.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ========================================
                    Statistics
                ======================================== */}

                <div className="coding-stats-grid">

                    <div className="coding-stat-card">

                        <div className="coding-stat-icon blue">
                            <Code2 size={20} />
                        </div>

                        <div>

                            <p className="coding-stat-label">
                                Total Submissions
                            </p>

                            <p className="coding-stat-value">
                                {statistics.total}
                            </p>

                        </div>

                    </div>


                    <div className="coding-stat-card">

                        <div className="coding-stat-icon green">
                            <CheckCircle2 size={20} />
                        </div>

                        <div>

                            <p className="coding-stat-label">
                                Accepted
                            </p>

                            <p className="coding-stat-value">
                                {statistics.accepted}
                            </p>

                        </div>

                    </div>


                    <div className="coding-stat-card">

                        <div className="coding-stat-icon purple">
                            <Target size={20} />
                        </div>

                        <div>

                            <p className="coding-stat-label">
                                Problems Attempted
                            </p>

                            <p className="coding-stat-value">
                                {statistics.attemptedProblems}
                            </p>

                        </div>

                    </div>


                    <div className="coding-stat-card">

                        <div className="coding-stat-icon orange">
                            <Trophy size={20} />
                        </div>

                        <div>

                            <p className="coding-stat-label">
                                Success Rate
                            </p>

                            <p className="coding-stat-value">
                                {statistics.successRate}%
                            </p>

                        </div>

                    </div>

                </div>


                {/* ========================================
                    Submission List
                ======================================== */}

                <section className="coding-submissions-card">

                    <div className="coding-submissions-header">

                        <div>

                            <h2>
                                Recent Submissions
                            </h2>

                            <p>
                                Your latest coding attempts.
                            </p>

                        </div>

                    </div>


                    {submissions.length === 0 ? (

                        <div className="coding-empty-state">

                            <Code2 size={40} />

                            <h3>
                                No submissions yet
                            </h3>

                            <p>
                                Complete a coding problem and
                                submit your solution to see it here.
                            </p>

                        </div>

                    ) : (

                        <div className="coding-submission-list">

                            {submissions.map(
                                (submission) => (

                                    <button
                                        key={submission.id}
                                        type="button"
                                        onClick={() =>
                                            handleOpenSubmission(
                                                submission.id
                                            )
                                        }
                                        className="coding-submission-row"
                                    >

                                        <div className="coding-submission-problem">

                                            <div className="coding-problem-icon">

                                                <Code2 size={18} />

                                            </div>

                                            <div>

                                                <p className="coding-problem-title">
                                                    {submission.title}
                                                </p>

                                                <div className="coding-problem-meta">

                                                    <span>
                                                        {submission.difficulty}
                                                    </span>

                                                    <span>•</span>

                                                    <span>
                                                        {submission.language}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                        <div
                                            className={`
                                                coding-submission-status
                                                ${
                                                    submission.status ===
                                                    "Accepted"
                                                        ? "accepted"
                                                        : "failed"
                                                }
                                            `}
                                        >

                                            {
                                                getStatusIcon(
                                                    submission.status
                                                )
                                            }

                                            <span>
                                                {submission.status}
                                            </span>

                                        </div>


                                        <div className="coding-submission-tests">

                                            <CheckCircle2 size={16} />

                                            <span>
                                                {submission.passed_tests}
                                                /
                                                {submission.total_tests}
                                            </span>

                                        </div>


                                        <div className="coding-submission-date">

                                            <Clock3 size={15} />

                                            <span>
                                                {
                                                    formatDate(
                                                        submission.submitted_at
                                                    )
                                                }
                                            </span>

                                        </div>


                                        <ChevronRight
                                            size={18}
                                            className="coding-submission-arrow"
                                        />

                                    </button>

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>


            {/* ========================================
                Submission Details Modal
            ======================================== */}

            {(selectedSubmission ||
                detailsLoading) && (

                <div
                    className="coding-modal-overlay"
                    onClick={
                        handleCloseDetails
                    }
                >

                    <div
                        className="coding-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {detailsLoading ? (

                            <div className="coding-modal-loading">

                                <Loader2
                                    size={30}
                                    className="
                                        animate-spin
                                        coding-history-loading-icon
                                    "
                                />

                            </div>

                        ) : (

                            <>

                                {/* Modal Header */}

                                <div className="coding-modal-header">

                                    <div>

                                        <h2>
                                            {
                                                selectedSubmission.title
                                            }
                                        </h2>

                                        <div className="coding-modal-meta">

                                            <span
                                                className={`
                                                    coding-modal-status
                                                    ${
                                                        selectedSubmission.status ===
                                                        "Accepted"
                                                            ? "accepted"
                                                            : "failed"
                                                    }
                                                `}
                                            >
                                                {
                                                    selectedSubmission.status
                                                }
                                            </span>

                                            <span>
                                                {
                                                    selectedSubmission.language
                                                }
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            handleCloseDetails
                                        }
                                        className="coding-modal-close"
                                        aria-label="Close"
                                    >

                                        <X size={19} />

                                    </button>

                                </div>


                                {/* Modal Content */}

                                <div className="coding-modal-content">

                                    {/* Stats */}

                                    <div className="coding-detail-grid">

                                        <div className="coding-detail-stat">

                                            <span>
                                                Tests
                                            </span>

                                            <strong>
                                                {
                                                    selectedSubmission.passed_tests
                                                }
                                                /
                                                {
                                                    selectedSubmission.total_tests
                                                }
                                            </strong>

                                        </div>


                                        <div className="coding-detail-stat">

                                            <span>
                                                Language
                                            </span>

                                            <strong>
                                                {
                                                    selectedSubmission.language
                                                }
                                            </strong>

                                        </div>


                                        <div className="coding-detail-stat">

                                            <span>
                                                Time
                                            </span>

                                            <strong>
                                                {
                                                    selectedSubmission.execution_time ??
                                                    "-"
                                                }
                                            </strong>

                                        </div>


                                        <div className="coding-detail-stat">

                                            <span>
                                                Memory
                                            </span>

                                            <strong>
                                                {
                                                    selectedSubmission.memory_used ??
                                                    "-"
                                                }
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Source Code */}

                                    <div className="coding-code-section">

                                        <div className="coding-code-header">

                                            <h3>
                                                Submitted Code
                                            </h3>


                                            <button
                                                type="button"
                                                onClick={
                                                    handleCopyCode
                                                }
                                                className="coding-copy-button"
                                            >

                                                <Copy size={14} />

                                                {
                                                    copied
                                                        ? "Copied"
                                                        : "Copy"
                                                }

                                            </button>

                                        </div>


                                        <pre className="coding-source-code">

                                            <code>
                                                {
                                                    selectedSubmission.source_code
                                                }
                                            </code>

                                        </pre>

                                    </div>


                                    <p className="coding-submitted-date">

                                        Submitted{" "}

                                        {
                                            formatDate(
                                                selectedSubmission.submitted_at
                                            )
                                        }

                                    </p>

                                </div>

                            </>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}


export default CodingHistory;