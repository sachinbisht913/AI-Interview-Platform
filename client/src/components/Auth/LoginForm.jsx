// File: src/components/Auth/LoginForm.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../../api/authApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginSuccess } from "../../redux/authSlice";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);

            // Save authentication data
            dispatch(
                loginSuccess({
                    token: response.data.token,
                    user: response.data.user,
                })
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");
        } catch (error) {
            toast.error("Login Failed");
        }
    };

    return (
        <div className="w-full">

            {/* Heading */}

            <h1
                className="
                    text-center
                    text-2xl
                    font-bold
                    text-slate-900
                    sm:text-3xl
                "
            >
                AI Interview Platform
            </h1>

            <p
                className="
                    mt-2
                    text-center
                    text-sm
                    text-slate-500
                    sm:text-base
                "
            >
                Welcome back! Login to continue.
            </p>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="
                    mt-7
                    sm:mt-8
                "
            >

                {/* Email */}

                <div className="mb-5">

                    <label
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-slate-900
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                            sm:text-base
                        "
                    />

                </div>

                {/* Password */}

                <div className="mb-2">

                    <label
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700
                        "
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-3
                            text-sm
                            text-slate-900
                            placeholder:text-slate-400
                            outline-none
                            transition
                            focus:border-blue-500
                            focus:ring-2
                            focus:ring-blue-500/20
                            sm:text-base
                        "
                    />

                </div>

                {/* Forgot Password */}

                <div className="mb-6 text-right">

                    <Link
                        to="/forgot-password"
                        className="
                            text-sm
                            text-blue-600
                            transition
                            hover:text-blue-700
                            hover:underline
                        "
                    >
                        Forgot Password?
                    </Link>

                </div>

                {/* Login Button */}

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
                    Login
                </button>

            </form>

            {/* Sign Up */}

            <p
                className="
                    mt-6
                    text-center
                    text-sm
                    text-slate-500
                    sm:text-base
                "
            >
                Don't have an account?{" "}

                <Link
                    to="/signup"
                    className="
                        text-blue-600
                        transition
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