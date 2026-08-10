// File: src/components/error/ErrorPage.jsx

import { motion } from "framer-motion";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ErrorPage({
    code = "404",
    title = "Page Not Found",
    description = "The page you're looking for doesn't exist or may have been moved.",
    type = "not-found",
}) {
    const navigate = useNavigate();

    const isServerError = type === "server";

    const handleBack = () => {
        navigate(-1);
    };

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <main
            className="
                error-page
                relative
                flex
                min-h-screen
                w-full
                items-center
                justify-center
                overflow-hidden
                px-4
                py-8
                sm:px-6
                lg:px-8
            "
        >

            {/* ==========================================
                Background Glow
            ========================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-32
                    left-1/2
                    h-64
                    w-64
                    -translate-x-1/2
                    rounded-full
                    bg-blue-600/10
                    blur-3xl
                    sm:h-96
                    sm:w-96
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    -bottom-32
                    -right-32
                    h-64
                    w-64
                    rounded-full
                    bg-violet-600/10
                    blur-3xl
                    sm:h-96
                    sm:w-96
                "
            />


            {/* ==========================================
                Error Card
            ========================================== */}

            <motion.section
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="
                    error-card
                    relative
                    z-10
                    w-full
                    max-w-2xl
                    rounded-3xl
                    border
                    p-6
                    text-center
                    shadow-2xl
                    backdrop-blur-xl
                    sm:p-10
                    lg:p-14
                "
            >

                {/* ==========================================
                    Error Code
                ========================================== */}

                <motion.h1
                    initial={{
                        scale: 0.8,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                    }}
                    transition={{
                        delay: 0.1,
                        duration: 0.4,
                    }}
                    className="
                        bg-gradient-to-r
                        from-blue-400
                        via-violet-400
                        to-purple-500
                        bg-clip-text
                        text-7xl
                        font-black
                        leading-none
                        text-transparent
                        sm:text-8xl
                        lg:text-9xl
                    "
                >
                    {code}
                </motion.h1>


                {/* ==========================================
                    Title
                ========================================== */}

                <h2
                    className="
                        error-title
                        mt-6
                        text-2xl
                        font-bold
                        sm:text-3xl
                        lg:text-4xl
                    "
                >
                    {title}
                </h2>


                {/* ==========================================
                    Description
                ========================================== */}

                <p
                    className="
                        error-description
                        mx-auto
                        mt-4
                        max-w-lg
                        text-sm
                        leading-6
                        sm:text-base
                        sm:leading-7
                    "
                >
                    {description}
                </p>


                {/* ==========================================
                    Status Badge
                ========================================== */}

                <div
                    className="
                        error-status
                        mx-auto
                        mt-6
                        inline-flex
                        items-center
                        rounded-full
                        border
                        px-4
                        py-2
                        text-xs
                        font-medium
                        sm:text-sm
                    "
                >
                    {isServerError
                        ? "Server Error"
                        : "Page Not Found"}
                </div>


                {/* ==========================================
                    Actions
                ========================================== */}

                <div
                    className="
                        mt-8
                        flex
                        w-full
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:justify-center
                    "
                >

                    {/* Back / Retry */}

                    <button
                        type="button"
                        onClick={
                            isServerError
                                ? handleRetry
                                : handleBack
                        }
                        className="
                            error-secondary-button
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            border
                            px-5
                            py-3
                            text-sm
                            font-medium
                            transition
                            sm:w-auto
                            sm:text-base
                        "
                    >
                        {isServerError ? (
                            <>
                                <RefreshCw size={18} />
                                Try Again
                            </>
                        ) : (
                            <>
                                <ArrowLeft size={18} />
                                Go Back
                            </>
                        )}
                    </button>


                    {/* Dashboard */}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-violet-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-blue-500/10
                            transition
                            hover:-translate-y-0.5
                            hover:from-blue-500
                            hover:to-violet-500
                            sm:w-auto
                            sm:text-base
                        "
                    >
                        <Home size={18} />
                        Dashboard
                    </button>

                </div>

            </motion.section>

        </main>
    );
}

export default ErrorPage;