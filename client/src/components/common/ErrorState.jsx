import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorState({
    title = "Something went wrong",
    message = "We couldn't load this information. Please try again.",
    onRetry,
}) {
    const navigate = useNavigate();

    return (
        <div
            className="
                flex
                min-h-[400px]
                w-full
                items-center
                justify-center
                px-4
                py-10
            "
        >
            <div
                className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900
                    p-6
                    text-center
                    shadow-xl
                    sm:p-8
                "
            >
                <div
                    className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-red-500/10
                    "
                >
                    <AlertTriangle
                        size={30}
                        className="text-red-400"
                    />
                </div>

                <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
                    {title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                    {message}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-5
                                py-3
                                font-medium
                                text-white
                                transition
                                hover:bg-blue-700
                            "
                        >
                            <RefreshCw size={18} />
                            Try Again
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-800
                            px-5
                            py-3
                            font-medium
                            text-white
                            transition
                            hover:bg-slate-700
                        "
                    >
                        <Home size={18} />
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ErrorState;