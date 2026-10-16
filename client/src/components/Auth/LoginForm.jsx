


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginSuccess } from "../../redux/authSlice";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        if (!formData.email.trim()) {
            return toast.error("Please enter your email.");
        }

        if (!formData.password) {
            return toast.error("Please enter your password.");
        }

        setIsLoading(true);

        try {
            const response = await loginUser({
                email: formData.email.trim(),
                password: formData.password,
            });

            const { token, user } = response.data;

            if (!token || !user) {
                throw new Error(
                    "Invalid login response. Please try again."
                );
            }

            // Save authentication data in Redux
            dispatch(
                loginSuccess({
                    token,
                    user,
                })
            );

            // Save authentication data in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login successful!");

            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("Login error:", error);

            let message = "Login failed. Please try again.";

            if (
                error.code === "ECONNABORTED" ||
                error.code === "ETIMEDOUT"
            ) {
                message =
                    "The server is taking too long to respond. The database may be unavailable. Please try again later.";
            } else if (!error.response && error.request) {
                message =
                    "Cannot connect to the server. Please check your connection or try again later.";
            } else if (error.response?.status >= 500) {
                message =
                    "The server encountered a problem. Please try again later.";
            } else if (error.response?.data?.message) {
                message = error.response.data.message;
            } else if (error.response?.data?.error) {
                message = error.response.data.error;
            } else if (error.message?.startsWith("Invalid login response")) {
                message = error.message;
            }

            toast.error(message, { duration: 6000 });
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = `
        w-full rounded-xl border border-slate-300
        bg-white px-4 py-3 text-sm text-slate-900
        placeholder:text-slate-400 outline-none transition
        focus:border-blue-500 focus:ring-2
        focus:ring-blue-500/20 sm:text-base
    `;

    return (
        <div className="w-full">
            {/* Heading */}
            <h1
                className="
                    text-center text-2xl font-bold
                    text-slate-900 sm:text-3xl
                "
            >
                AI Interview Platform
            </h1>

            <p
                className="
                    mt-2 text-center text-sm
                    text-slate-500 sm:text-base
                "
            >
                Welcome back! Login to continue.
            </p>

            {/* Signup success message */}
            {location.state?.message && (
                <p
                    role="status"
                    className="mt-4 text-center text-sm text-green-600"
                >
                    {location.state.message}
                </p>
            )}

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="mt-7 sm:mt-8"
            >
                {/* Email */}
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="
                            mb-2 block text-sm
                            font-medium text-slate-700
                        "
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                        disabled={isLoading}
                        className={inputClass}
                    />
                </div>

                {/* Password */}
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="
                            mb-2 block text-sm
                            font-medium text-slate-700
                        "
                    >
                        Password
                    </label>

                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            disabled={isLoading}
                            className={`${inputClass} pr-12`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                            aria-pressed={showPassword}
                            className="
                                absolute inset-y-0 right-3
                                flex items-center
                                text-slate-500 transition
                                hover:text-slate-800
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-blue-500
                                rounded
                            "
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="mb-6 text-right">
                    <Link
                        to="/forgot-password"
                        className="
                            text-sm text-blue-600
                            transition hover:text-blue-700
                            hover:underline
                        "
                    >
                        Forgot Password?
                    </Link>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="
                        w-full rounded-xl bg-blue-600 py-3
                        text-sm font-semibold text-white
                        transition hover:bg-blue-700
                        active:scale-[0.99]
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                        sm:py-3.5 sm:text-base
                    "
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Sign Up */}
            <p
                className="
                    mt-6 text-center text-sm
                    text-slate-500 sm:text-base
                "
            >
                Don't have an account?{" "}

                <Link
                    to="/signup"
                    className="
                        text-blue-600 transition
                        hover:text-blue-700
                        hover:underline
                    "
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default LoginForm;