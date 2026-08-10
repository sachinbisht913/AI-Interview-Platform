// File: src/components/interview/ReportActions.jsx

import {
    ArrowLeft,
    Download,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function ReportActions({ onDownload }) {
    const navigate = useNavigate();

    return (
        <div
            className="
                flex
                w-full
                flex-col
                gap-3
                sm:flex-row
                sm:gap-4
            "
        >

            {/* Back to History */}

            <button
                onClick={() => navigate("/interview-history")}
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-700
                    px-6
                    py-3.5
                    text-sm
                    text-white
                    transition
                    hover:border-blue-500
                    sm:w-auto
                    sm:py-4
                    sm:text-base
                "
            >
                <ArrowLeft size={18} />

                Back to History
            </button>

            {/* Download PDF */}

            <button
                onClick={onDownload}
                className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-600
                    to-violet-600
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:scale-[1.02]
                    sm:w-auto
                    sm:py-4
                    sm:text-base
                    sm:hover:scale-105
                "
            >
                <Download size={18} />

                Download PDF
            </button>

        </div>
    );
}

export default ReportActions;