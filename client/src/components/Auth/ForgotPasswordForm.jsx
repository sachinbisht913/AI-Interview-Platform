import { Link } from "react-router-dom";

function ForgotPasswordForm() {
  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-white text-center">
        Forgot Password
      </h2>

      <p className="text-slate-400 text-center mt-2">
        Enter your email and we'll send you a password reset link.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label className="block text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Send Reset Link
        </button>
      </form>

      <p className="text-center text-slate-400 mt-6">
        Remember your password?{" "}
        <Link
          to="/login"
          className="text-blue-400 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordForm;