import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Mail,
    Send,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { forgotPassword } from "../api/authApi";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {

            setError("Please enter your email address.");

            return;

        }

        try {

            setLoading(true);

            const { data } = await forgotPassword(
                email.trim()
            );

            setMessage(
                data.message ||
                "If an account exists with this email, a password reset link has been sent."
            );

        } catch (error) {

            console.error(
                "Forgot Password Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.apiMessage ||
                "Unable to process your request. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">

            <div className="flex min-h-[85vh] items-center justify-center">

                <div className="w-full max-w-md">

                    {/* Logo / Back */}

                    <div className="mb-8">

                        <Link
                            to="/login"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-400
                                transition
                                hover:text-white
                            "
                        >

                            <ArrowLeft size={17} />

                            Back to Login

                        </Link>

                    </div>


                    {/* Card */}

                    <div className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-6
                        shadow-2xl
                        sm:p-8
                    ">

                        {/* Icon */}

                        <div className="
                            mb-6
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-slate-800
                            border
                            border-slate-700
                        ">

                            <Mail
                                size={26}
                                className="text-blue-400"
                            />

                        </div>


                        {/* Heading */}

                        <div>

                            <h1 className="
                                text-2xl
                                font-bold
                                text-white
                                sm:text-3xl
                            ">

                                Forgot Password?

                            </h1>

                            <p className="
                                mt-3
                                text-sm
                                leading-6
                                text-slate-400
                            ">

                                Enter the email address associated
                                with your account and we'll send you
                                a secure password reset link.

                            </p>

                        </div>


                        {/* Success */}

                        {message && (

                            <div className="
                                mt-6
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                border
                                border-emerald-500/20
                                bg-emerald-500/10
                                p-4
                            ">

                                <CheckCircle2
                                    size={20}
                                    className="
                                        mt-0.5
                                        shrink-0
                                        text-emerald-400
                                    "
                                />

                                <p className="
                                    text-sm
                                    leading-6
                                    text-emerald-300
                                ">

                                    {message}

                                </p>

                            </div>

                        )}


                        {/* Error */}

                        {error && (

                            <div className="
                                mt-6
                                flex
                                items-start
                                gap-3
                                rounded-2xl
                                border
                                border-red-500/20
                                bg-red-500/10
                                p-4
                            ">

                                <AlertCircle
                                    size={20}
                                    className="
                                        mt-0.5
                                        shrink-0
                                        text-red-400
                                    "
                                />

                                <p className="
                                    text-sm
                                    leading-6
                                    text-red-300
                                ">

                                    {error}

                                </p>

                            </div>

                        )}


                        {/* Form */}

                        {!message && (

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-6"
                            >

                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    ">

                                        Email Address

                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-slate-500
                                            "
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="you@example.com"
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-slate-700
                                                bg-slate-950
                                                py-3.5
                                                pl-11
                                                pr-4
                                                text-sm
                                                text-white
                                                placeholder:text-slate-600
                                                outline-none
                                                transition
                                                focus:border-blue-500
                                                focus:ring-1
                                                focus:ring-blue-500/30
                                            "
                                        />

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-blue-600
                                        px-5
                                        py-3.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-blue-500
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >

                                    <Send size={17} />

                                    {loading
                                        ? "Sending..."
                                        : "Send Reset Link"}

                                </button>

                            </form>

                        )}


                        {/* Success action */}

                        {message && (

                            <Link
                                to="/login"
                                className="
                                    mt-6
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    px-5
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-slate-700
                                "
                            >

                                Return to Login

                            </Link>

                        )}

                    </div>

                    {/* Footer */}

                    <p className="
                        mt-6
                        text-center
                        text-xs
                        text-slate-600
                    ">

                        AI Interview Platform

                    </p>

                </div>

            </div>

        </div>

    );

}

export default ForgotPassword;