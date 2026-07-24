import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../../redux/authSlice";

function LoginForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const navigate = useNavigate();
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


      // Save token
      dispatch(
        loginSuccess({
            token: response.data.token,
            user: response.data.user,
        })
    );
    
    localStorage.setItem("token", response.data.token);
    
    localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
    );

     

      navigate("/dashboard");

  } catch (error) {

      alert(
          error.response?.data?.message || "Login Failed"
      );

  }

};

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-white text-center">
        AI Interview Platform
      </h1>

      <p className="text-slate-400 text-center mt-2">
        Welcome back! Login to continue.
      </p>

      <form  onSubmit={handleSubmit}
       className="mt-8">

        <div className="mb-5">
          <label className="block text-slate-300 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-2">
          <label className="block text-slate-300 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-right mb-6">
          <Link
            to="/forgot-password"
            className="text-blue-400 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </form>

      <p className="text-center text-slate-400 mt-6">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-400 hover:underline"
        >
          Sign Up
        </Link>
      </p>

    </div>
  );
}

export default LoginForm;