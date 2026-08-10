// File: src/components/Auth/SignupForm.jsx

import { Link } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../api/authApi";
import toast from "react-hot-toast";

function SignupForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            const response = await signupUser({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });

            toast.success(response.data.message);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="w-full">

            {/* Heading */}

            <h2
                className="
                    text-center
                    text-2xl
                    font-bold
                    text-slate-900
                    sm:text-3xl
                "
            >
                Create Account
            </h2>

            <p
                className="
                    mt-2
                    text-center
                    text-sm
                    text-slate-500
                    sm:text-base
                "
            >
                Join AI Interview Platform
            </p>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                    mt-6
                    space-y-4
                    sm:mt-8
                    sm:space-y-5
                "
            >

                {/* Full Name */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                            sm:text-base
                        "
                    >
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your Name..."
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            p-3
                            text-sm
                            text-slate-900
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                            sm:p-3.5
                            sm:text-base
                        "
                    />

                </div>

                {/* Email */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                            sm:text-base
                        "
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your Email..."
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            p-3
                            text-sm
                            text-slate-900
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                            sm:p-3.5
                            sm:text-base
                        "
                    />

                </div>

                {/* Password */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                            sm:text-base
                        "
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="********"
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            p-3
                            text-sm
                            text-slate-900
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                            sm:p-3.5
                            sm:text-base
                        "
                    />

                </div>

                {/* Confirm Password */}

                <div>

                    <label
                        className="
                            text-sm
                            font-medium
                            text-slate-700
                            sm:text-base
                        "
                    >
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="********"
                        className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            p-3
                            text-sm
                            text-slate-900
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                            sm:p-3.5
                            sm:text-base
                        "
                    />

                </div>

                {/* Submit */}

                <button
                    type="submit"
                    className="
                        w-full
                        rounded-xl
                        bg-blue-600
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                        active:scale-[0.99]
                        sm:py-3.5
                        sm:text-base
                    "
                >
                    Create Account
                </button>

            </form>

            {/* Login */}

            <p
                className="
                    mt-5
                    text-center
                    text-sm
                    text-slate-500
                    sm:mt-6
                    sm:text-base
                "
            >
                Already have an account?{" "}

                <Link
                    to="/login"
                    className="
                        text-blue-600
                        transition
                        hover:text-blue-700
                        hover:underline
                    "
                >
                    Login
                </Link>
            </p>

        </div>
    );
}

export default SignupForm;