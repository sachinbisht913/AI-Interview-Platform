// File: src/pages/Login.jsx

import AuthBanner from "../components/Auth/AuthBanner";
import LoginForm from "../components/Auth/LoginForm";

function Login() {
    console.log("login page");

    return (
        <div className="flex min-h-screen flex-col lg:flex-row">

            {/* Auth Banner */}

            <div className="hidden lg:flex lg:w-1/2">
                <AuthBanner />
            </div>

            {/* Login Form */}

            <div
                className="
                    flex
                    min-h-screen
                    w-full
                    flex-1
                    items-center
                    justify-center
                    px-4
                    py-8
                    sm:px-6
                    sm:py-10
                    lg:w-1/2
                    lg:px-10
                    lg:py-12
                "
            >
                <div className="w-full max-w-md">
                    <LoginForm />
                </div>
            </div>

        </div>
    );
}

export default Login;