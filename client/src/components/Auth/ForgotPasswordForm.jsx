import { Link } from "react-router-dom";
import { useState } from "react";

import {
    ArrowLeft,
    Mail,
    Send,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import toast from "react-hot-toast";

import { forgotPassword } from "../../api/authApi";


function ForgotPasswordForm() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error("Please enter your email.");

            return;

        }

        try {

            setLoading(true);

            setSuccess(false);

            const response = await forgotPassword(
                email.trim()
            );

            setSuccess(true);

            toast.success(
                "If the account exists, a reset link has been sent."
            );

        } catch (error) {

            console.error(
                "Forgot Password Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.apiMessage ||
                "Unable to send reset link."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="w-full">

            {/* Back to Login */}

            <Link
                to="/login"
                className="
                    mb-6
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-400
                    transition
                    hover:text-white
                "
            >

                <ArrowLeft size={16} />

                Back to Login

            </Link>


            {/* Heading */}

            <div className="text-center">

                <div
                    className="
                        mx-auto
                        mb-5
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-800
                    "
                >

                    <Mail
                        size={26}
                        className="text-blue-400"
                    />

                </div>


                <h1
                    className="
                        text-2xl
                        font-bold
                        text-white
                        sm:text-3xl
                    "
                >
                    Forgot Password?
                </h1>


                <p
                    className="
                        mt-2
                        text-sm
                        leading-6
                        text-slate-400
                        sm:text-base
                    "
                >
                    Enter your email address and we'll send
                    you a secure password reset link.
                </p>

            </div>


            {/* Success State */}

            {success ? (

                <div className="mt-8">

                    <div
                        className="
                            rounded-2xl
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            p-5
                        "
                    >

                        <div className="flex items-start gap-3">

                            <CheckCircle2
                                size={21}
                                className="
                                    mt-0.5
                                    shrink-0
                                    text-emerald-400
                                "
                            />

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                        text-emerald-300
                                    "
                                >
                                    Check your email
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-slate-300
                                    "
                                >
                                    If an account exists with
                                    <span className="font-medium text-white">
                                        {" "}{email}
                                    </span>
                                    , we've sent a password reset
                                    link.
                                </p>

                                <p
                                    className="
                                        mt-3
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    The reset link will expire
                                    after 15 minutes.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Try another email */}

                    <button
                        type="button"
                        onClick={() => {
                            setSuccess(false);
                            setEmail("");
                        }}
                        className="
                            mt-5
                            w-full
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-800
                            py-3
                            text-sm
                            font-semibold
                            text-slate-200
                            transition
                            hover:bg-slate-700
                        "
                    >
                        Try Another Email
                    </button>

                </div>

            ) : (

                /* Form */

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-8
                    "
                >

                    {/* Email */}

                    <div className="mb-6">

                        <label
                            className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-slate-300
                            "
                        >
                            Email
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
                                name="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                disabled={loading}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    py-3
                                    pl-11
                                    pr-4
                                    text-sm
                                    text-white
                                    placeholder:text-slate-500
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    sm:py-3.5
                                    sm:text-base
                                "
                            />

                        </div>

                    </div>


                    {/* Send Button */}

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
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            active:scale-[0.99]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            sm:py-3.5
                            sm:text-base
                        "
                    >

                        <Send size={17} />

                        {loading
                            ? "Sending..."
                            : "Send Reset Link"}

                    </button>

                </form>

            )}


            {/* Security Note */}

            {!success && (

                <div
                    className="
                        mt-6
                        flex
                        items-start
                        gap-3
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-900/50
                        p-4
                    "
                >

                    <AlertCircle
                        size={17}
                        className="
                            mt-0.5
                            shrink-0
                            text-slate-500
                        "
                    />

                    <p
                        className="
                            text-xs
                            leading-5
                            text-slate-500
                        "
                    >
                        For your security, we won't reveal
                        whether an account exists with this
                        email address.
                    </p>

                </div>

            )}


            {/* Bottom */}

            <p
                className="
                    mt-6
                    text-center
                    text-sm
                    text-slate-400
                "
            >

                Remember your password?{" "}

                <Link
                    to="/login"
                    className="
                        font-medium
                        text-blue-400
                        transition
                        hover:text-blue-300
                        hover:underline
                    "
                >
                    Login
                </Link>

            </p>

        </div>

    );

}

export default ForgotPasswordForm;