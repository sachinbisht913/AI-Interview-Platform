
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

export default function CodingHistory() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCodingSubmissions();

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to load coding history."
        );
      }

      setSubmissions(response.data.submissions || []);
    } catch (err) {
      console.error("Coding History Error:", err);
      setError(err.apiMessage || err.message || "Failed to load coding history.");
    } finally {
      setLoading(false);
    }
  };

  const statistics = useMemo(() => {
    const total = submissions.length;

    const accepted = submissions.filter(
      (submission) => submission.status === "Accepted"
    ).length;

    const attemptedProblems = new Set(
      submissions.map((submission) => submission.problem_id)
    ).size;

    const successRate =
      total > 0 ? Math.round((accepted / total) * 100) : 0;

    return { total, accepted, attemptedProblems, successRate };
  }, [submissions]);

  const handleOpenSubmission = async (id) => {
    try {
      setDetailsLoading(true);
      setDetailsError("");
      setSelectedSubmission(null);
      setCopied(false);

      const response = await getCodingSubmissionById(id);

      if (response.data?.success && response.data.submission) {
        setSelectedSubmission(response.data.submission);
      } else {
        setDetailsError(
          response.data?.message || "Could not load submission details."
        );
      }
    } catch (err) {
      console.error("Get Submission Error:", err);
      setDetailsError(
        err.apiMessage || err.message || "Could not load submission details."
      );
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedSubmission(null);
    setDetailsLoading(false);
    setDetailsError("");
    setCopied(false);
  };

  const handleCopyCode = async () => {
    if (!selectedSubmission?.source_code) return;

    try {
      await navigator.clipboard.writeText(selectedSubmission.source_code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy Code Error:", err);
      setDetailsError("Could not copy code. Please copy it manually.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "-";

    return parsedDate.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const stats = [
    {
      label: "Total Submissions",
      value: statistics.total,
      icon: Code2,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Accepted",
      value: statistics.accepted,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Problems Attempted",
      value: statistics.attemptedProblems,
      icon: Target,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Success Rate",
      value: `${statistics.successRate}%`,
      icon: Trophy,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-slate-950 px-4 text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-blue-400" size={32} />
          <p>Loading coding history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-slate-950 px-4">
        <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-slate-300">
          <AlertCircle size={32} className="text-red-400" />
          <p className="break-words">{error}</p>
          <button
            type="button"
            onClick={fetchSubmissions}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-slate-950 px-3 py-5 text-slate-100 sm:px-6 sm:py-8 lg:px-8">
      <main className="mx-auto w-full min-w-0 max-w-7xl">
        {/* Header */}
        <header className="mb-6 flex min-w-0 items-center gap-3 sm:mb-8 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 sm:h-12 sm:w-12">
          C
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Coding History
            </h1>
            <p className="mt-1 text-sm leading-6 text-slate-400 sm:text-base">
              Review your coding submissions and performance.
            </p>
          </div>
        </header>

        {/* Statistics: 2 columns on mobile, 4 on desktop */}
        <section
          aria-label="Coding statistics"
          className="mb-6 grid w-full min-w-0 grid-cols-2 gap-3 sm:mb-8 sm:gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex min-w-0 items-start gap-2.5 rounded-2xl border border-slate-800 bg-slate-900 p-3 sm:items-center sm:gap-3 sm:p-5"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${stat.bg} ${stat.color}`}
                >
                  <Icon size={20} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-words text-xs leading-4 text-slate-400 sm:text-sm sm:leading-5">
                    {stat.label}
                  </p>
                  <p className="mt-1 break-words text-xl font-bold text-white sm:text-2xl">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Recent submissions */}
        <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 px-4 py-5 sm:px-5">
            <h2 className="text-lg font-semibold text-white">
              Recent Submissions
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Your latest coding attempts.
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
              <Code2 size={42} className="mb-5 text-slate-500" />

              <h3 className="text-lg font-semibold text-white">
                No submissions yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                Complete a coding problem and submit your solution to see it
                here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {submissions.map((submission) => {
                const accepted = submission.status === "Accepted";

                return (
                  <button
                    key={submission.id}
                    type="button"
                    onClick={() => handleOpenSubmission(submission.id)}
                    className="grid w-full min-w-0 grid-cols-2 items-center gap-x-3 gap-y-3 p-4 text-left transition hover:bg-slate-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 sm:flex sm:gap-4 sm:px-5"
                  >
                    <div className="col-span-2 flex min-w-0 items-center gap-3 sm:col-span-1 sm:flex-1">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        <Code2 size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words font-medium text-white">
                          {submission.title || "Untitled problem"}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          <span>{submission.difficulty || "—"}</span>
                          <span>•</span>
                          <span>{submission.language || "—"}</span>
                        </div>
                      </div>

                      <ChevronRight
                        size={18}
                        className="hidden shrink-0 text-slate-500 sm:block"
                      />
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5">
                      {accepted ? (
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-emerald-400"
                        />
                      ) : (
                        <XCircle
                          size={16}
                          className="shrink-0 text-red-400"
                        />
                      )}

                      <span
                        className={`break-words text-xs font-medium sm:text-sm ${
                          accepted ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {submission.status || "Unknown"}
                      </span>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 text-sm text-slate-300 sm:justify-start">
                      <CheckCircle2
                        size={15}
                        className="shrink-0 text-emerald-400"
                      />
                      <span>
                        {submission.passed_tests ?? 0}/
                        {submission.total_tests ?? 0}
                      </span>
                    </div>

                    <div className="col-span-2 flex min-w-0 items-start gap-2 text-xs text-slate-400 sm:col-span-1 sm:w-44 sm:shrink-0 sm:text-sm">
                      <Clock3 size={15} className="mt-0.5 shrink-0" />
                      <span className="break-words">
                        {formatDate(submission.submitted_at)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Submission details modal */}
      {(selectedSubmission || detailsLoading || detailsError) && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={handleCloseDetails}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Submission details"
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[92dvh] w-full min-w-0 flex-col overflow-hidden rounded-t-2xl border border-slate-800 bg-slate-900 shadow-2xl sm:max-h-[88vh] sm:max-w-3xl sm:rounded-2xl"
          >
            {detailsLoading ? (
              <div className="flex min-h-52 flex-col items-center justify-center gap-3 text-slate-300">
                <Loader2 size={30} className="animate-spin text-blue-400" />
                <p>Loading submission...</p>
              </div>
            ) : detailsError && !selectedSubmission ? (
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <AlertCircle size={30} className="text-red-400" />
                <p className="break-words text-slate-300">{detailsError}</p>
                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            ) : selectedSubmission ? (
              <>
                {/* Modal header */}
                <div className="flex min-w-0 items-start justify-between gap-3 border-b border-slate-800 p-4 sm:p-5">
                  <div className="min-w-0 flex-1">
                    <h2 className="break-words text-lg font-semibold text-white sm:text-xl">
                      {selectedSubmission.title || "Submission details"}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          selectedSubmission.status === "Accepted"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {selectedSubmission.status || "Unknown"}
                      </span>

                      <span className="break-words text-sm text-slate-400">
                        {selectedSubmission.language || "—"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseDetails}
                    aria-label="Close submission details"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable modal content */}
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    {[
                      {
                        label: "Tests",
                        value: `${selectedSubmission.passed_tests ?? 0}/${
                          selectedSubmission.total_tests ?? 0
                        }`,
                      },
                      {
                        label: "Language",
                        value: selectedSubmission.language || "—",
                      },
                      {
                        label: "Time",
                        value: selectedSubmission.execution_time ?? "—",
                      },
                      {
                        label: "Memory",
                        value: selectedSubmission.memory_used ?? "—",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="min-w-0 rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:p-4"
                      >
                        <p className="text-xs text-slate-400 sm:text-sm">
                          {item.label}
                        </p>
                        <p className="mt-2 break-words text-sm font-semibold text-white sm:text-base">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {detailsError && (
                    <p className="break-words text-sm text-red-400">
                      {detailsError}
                    </p>
                  )}

                  {/* Source code */}
                  <div className="min-w-0 overflow-hidden rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/60 px-3 py-3 sm:px-4">
                      <h3 className="text-sm font-semibold text-white sm:text-base">
                        Submitted Code
                      </h3>

                      <button
                        type="button"
                        onClick={handleCopyCode}
                        disabled={!selectedSubmission.source_code}
                        className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                      >
                        <Copy size={14} />
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <pre className="max-h-[42vh] max-w-full overflow-auto bg-slate-950 p-4 text-xs leading-6 text-slate-300 sm:text-sm">
                      <code>
                        {selectedSubmission.source_code || "// No source code"}
                      </code>
                    </pre>
                  </div>

                  <p className="break-words text-xs text-slate-400 sm:text-sm">
                    Submitted {formatDate(selectedSubmission.submitted_at)}
                  </p>
                </div>
              </>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}
