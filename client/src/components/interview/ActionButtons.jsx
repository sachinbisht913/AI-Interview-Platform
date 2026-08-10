// File: src/components/interview/ActionButtons.jsx

import {
    FileText,
    RotateCcw,
    Home,
    Download,
    Share2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ActionButtons({
    interviewId,
    onDownload,
    onShare,
}) {

    const navigate = useNavigate();

    return (

        <section className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-5
            sm:p-6
            lg:p-8
        ">

            {/* Header */}

            <div className="mb-6 sm:mb-8">

                <h2 className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-white
                ">

                    What's Next?

                </h2>

                <p className="
                    mt-2
                    max-w-3xl
                    text-sm
                    sm:text-base
                    leading-6
                    sm:leading-7
                    text-slate-400
                ">

                    Continue your preparation by exploring the detailed
                    report, downloading your feedback, or starting another
                    interview.

                </p>

            </div>

            {/* Actions */}

            <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-5
                sm:gap-5
            ">

                {/* View Report */}

                <button
                    onClick={() =>
                        navigate(`/interview-report/${interviewId}`)
                    }
                    className="
                        group
                        flex
                        min-h-[190px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-blue-500/20
                        bg-gradient-to-br
                        from-blue-500/10
                        to-blue-600/5
                        p-5
                        text-center
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-blue-500
                    "
                >

                    <div className="
                        mb-4
                        flex
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-500/20
                    ">

                        <FileText
                            size={25}
                            className="text-blue-400 sm:size-7"
                        />

                    </div>

                    <h3 className="font-semibold text-white">

                        View Report

                    </h3>

                    <p className="
                        mt-2
                        max-w-[220px]
                        text-sm
                        leading-6
                        text-slate-400
                    ">

                        Open your complete AI interview report.

                    </p>

                </button>

                {/* Retake */}

                <button
                    onClick={() =>
                        navigate("/mock-interview")
                    }
                    className="
                        group
                        flex
                        min-h-[190px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-gradient-to-br
                        from-violet-500/10
                        to-violet-600/5
                        p-5
                        text-center
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-violet-500
                    "
                >

                    <div className="
                        mb-4
                        flex
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-violet-500/20
                    ">

                        <RotateCcw
                            size={25}
                            className="text-violet-400 sm:size-7"
                        />

                    </div>

                    <h3 className="font-semibold text-white">

                        Retake Interview

                    </h3>

                    <p className="
                        mt-2
                        max-w-[220px]
                        text-sm
                        leading-6
                        text-slate-400
                    ">

                        Practice again and improve your score.

                    </p>

                </button>

                {/* Download */}

                <button
                    onClick={onDownload}
                    className="
                        group
                        flex
                        min-h-[190px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-emerald-500/20
                        bg-gradient-to-br
                        from-emerald-500/10
                        to-green-600/5
                        p-5
                        text-center
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-emerald-500
                    "
                >

                    <div className="
                        mb-4
                        flex
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-500/20
                    ">

                        <Download
                            size={25}
                            className="text-emerald-400 sm:size-7"
                        />

                    </div>

                    <h3 className="font-semibold text-white">

                        Download PDF

                    </h3>

                    <p className="
                        mt-2
                        max-w-[220px]
                        text-sm
                        leading-6
                        text-slate-400
                    ">

                        Save your interview report as a PDF.

                    </p>

                </button>

                {/* Share */}

                <button
                    onClick={onShare}
                    className="
                        group
                        flex
                        min-h-[190px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-orange-500/20
                        bg-gradient-to-br
                        from-orange-500/10
                        to-red-600/5
                        p-5
                        text-center
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-orange-500
                    "
                >

                    <div className="
                        mb-4
                        flex
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-orange-500/20
                    ">

                        <Share2
                            size={25}
                            className="text-orange-400 sm:size-7"
                        />

                    </div>

                    <h3 className="font-semibold text-white">

                        Share Report

                    </h3>

                    <p className="
                        mt-2
                        max-w-[220px]
                        text-sm
                        leading-6
                        text-slate-400
                    ">

                        Share your report with mentors or recruiters.

                    </p>

                </button>

                {/* Dashboard */}

                <button
                    onClick={() =>
                        navigate("/dashboard")
                    }
                    className="
                        group
                        flex
                        min-h-[190px]
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-700
                        bg-gradient-to-br
                        from-slate-800
                        to-slate-900
                        p-5
                        text-center
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-slate-500
                    "
                >

                    <div className="
                        mb-4
                        flex
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-700
                    ">

                        <Home
                            size={25}
                            className="text-white sm:size-7"
                        />

                    </div>

                    <h3 className="font-semibold text-white">

                        Dashboard

                    </h3>

                    <p className="
                        mt-2
                        max-w-[220px]
                        text-sm
                        leading-6
                        text-slate-400
                    ">

                        Return to your dashboard overview.

                    </p>

                </button>

            </div>

        </section>

    );

}

export default ActionButtons;