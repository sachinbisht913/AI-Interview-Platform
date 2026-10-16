
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../api/authApi";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function SignupForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!formData.fullName.trim()) {
            return toast.error("Please enter your full name.");
        }

        if (!formData.email.trim()) {
            return toast.error("Please enter your email.");
        }

        if (!formData.password) {
            return toast.error("Please enter your password.");
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        setIsLoading(true);

        try {
            const response = await signupUser({
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                password: formData.password,
            });

            const successMessage =
                response.data?.message ||
                "Account created successfully! Please log in.";

            toast.success(successMessage);

            navigate("/login", {
                state: {
                    message: successMessage,
                },
            });
       } catch (error) {
  console.error("Signup error:", error);

  let message = "Unable to create your account. Please try again.";

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    message =
      "The server is taking too long to respond. The database may be unavailable. Please try again later.";
  } else if (!error.response && error.request) {
    message =
      "Cannot connect to the server. Please check your connection or try again later.";
  } else if (error.response?.status >= 500) {
    message =
      "The server encountered a problem. The database may be unavailable. Please try again later.";
  } else if (error.response?.data?.message) {
    message = error.response.data.message;
  } else if (error.response?.data?.error) {
    message = error.response.data.error;
  }

  toast.error(message, {
    duration: 6000,
  });
} finally {
  setIsLoading(false);
}
    };

    const inputClass = `
        mt-2 w-full rounded-xl border border-slate-300
        bg-white p-3 text-sm text-slate-900
        placeholder:text-slate-400 outline-none transition
        focus:border-blue-500 focus:ring-2
        focus:ring-blue-500/20 sm:p-3.5 sm:text-base
    `;

    return (
        <div className="w-full">
            {/* Heading */}

            <h2
                className="
                    text-center text-2xl font-bold
                    text-slate-900 sm:text-3xl
                "
            >
                Create Account
            </h2>

            <p
                className="
                    mt-2 text-center text-sm
                    text-slate-500 sm:text-base
                "
            >
                Join AI Interview Platform
            </p>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                    mt-6 space-y-4
                    sm:mt-8 sm:space-y-5
                "
            >
                {/* Full Name */}

                <div>
                    <label
                        htmlFor="fullName"
                        className="
                            text-sm font-medium
                            text-slate-700 sm:text-base
                        "
                    >
                        Full Name
                    </label>

                    <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your Name..."
                        autoComplete="name"
                        className={inputClass}
                    />
                </div>

                {/* Email */}

                <div>
                    <label
                        htmlFor="email"
                        className="
                            text-sm font-medium
                            text-slate-700 sm:text-base
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
                        placeholder="Enter your Email..."
                        autoComplete="email"
                        className={inputClass}
                    />
                </div>

                {/* Password */}

                <div>
                    <label
                        htmlFor="password"
                        className="
                            text-sm font-medium
                            text-slate-700 sm:text-base
                        "
                    >
                        Password
                    </label>

                    <div className="relative mt-2">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            autoComplete="new-password"
                            className={`${inputClass} mt-0 pr-12`}
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

                {/* Confirm Password */}

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="
                            text-sm font-medium
                            text-slate-700 sm:text-base
                        "
                    >
                        Confirm Password
                    </label>

                    <div className="relative mt-2">
                        <input
                            id="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="********"
                            autoComplete="new-password"
                            className={`${inputClass} mt-0 pr-12`}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    (prev) => !prev
                                )
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                            }
                            aria-pressed={showConfirmPassword}
                            className="
                                absolute inset-y-0 right-3
                                flex items-center
                                text-slate-500 transition
                                hover:text-slate-800
                            "
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit */}

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
                    {isLoading
                        ? "Creating account..."
                        : "Create Account"}
                </button>
            </form>

            {/* Login */}

            <p
                className="
                    mt-5 text-center text-sm
                    text-slate-500 sm:mt-6 sm:text-base
                "
            >
                Already have an account?{" "}

                <Link
                    to="/login"
                    className="
                        text-blue-600 transition
                        hover:text-blue-700 hover:underline
                    "
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignupForm;
