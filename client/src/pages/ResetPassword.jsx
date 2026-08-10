import { useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Lock,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { resetPassword } from "../api/authApi";

function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");


        if (!password || !confirmPassword) {

            setError(
                "Please fill in both password fields."
            );

            return;

        }


        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;

        }


        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;

        }


        if (!token) {

            setError(
                "Invalid password reset link."
            );

            return;

        }


        try {

            setLoading(true);

            const { data } = await resetPassword(
                token,
                password
            );

            setMessage(
                data.message ||
                "Password reset successfully."
            );

        } catch (error) {

            console.error(
                "Reset Password Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.apiMessage ||
                "Unable to reset password. The link may have expired."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6">

            <div className="flex min-h-[85vh] items-center justify-center">

                <div className="w-full max-w-md">

                    {/* Back */}

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
                            border
                            border-slate-700
                            bg-slate-800
                        ">

                            <Lock
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

                                Reset Password

                            </h1>

                            <p className="
                                mt-3
                                text-sm
                                leading-6
                                text-slate-400
                            ">

                                Create a new password for
                                your account.

                            </p>

                        </div>


                        {/* Success */}

                        {message && (

                            <div className="
                                mt-6
                                rounded-2xl
                                border
                                border-emerald-500/20
                                bg-emerald-500/10
                                p-5
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <CheckCircle2
                                        size={21}
                                        className="text-emerald-400"
                                    />

                                    <p className="
                                        font-medium
                                        text-emerald-300
                                    ">

                                        {message}

                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                    className="
                                        mt-5
                                        w-full
                                        rounded-xl
                                        bg-emerald-600
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-emerald-500
                                    "
                                >

                                    Continue to Login

                                </button>

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
                                className="mt-8 space-y-5"
                            >

                                {/* New Password */}

                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    ">

                                        New Password

                                    </label>

                                    <div className="relative">

                                        <Lock
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
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter new password"
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


                                {/* Confirm Password */}

                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    ">

                                        Confirm New Password

                                    </label>

                                    <div className="relative">

                                        <Lock
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
                                            type="password"
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm new password"
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


                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        mt-3
                                        flex
                                        w-full
                                        items-center
                                        justify-center
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

                                    {loading
                                        ? "Resetting Password..."
                                        : "Reset Password"}

                                </button>

                            </form>

                        )}

                    </div>


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

export default ResetPassword;