import { Link } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../api/authApi";
function SignupForm() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const handleChange=(e)=>{
   

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
}

const handleSubmit= async (e)=>{
  e.preventDefault();
  if(formData.password != formData.confirmPassword){
    return alert("password do not match!");
  }

  try{
    const response = await signupUser({
      fullName:formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    alert(response.data.message);
  }catch(error){
    console.log(error);
console.log(error.response);
console.log(error.response?.data);

alert(error.response?.data?.message || "Something went wrong");
  }

}

  return (
    <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl">

      <h2 className="text-3xl font-bold text-center text-white">
        Create Account
      </h2>

      <p className="text-slate-400 text-center mt-2">
        Join AI Interview Platform
      </p>

      <form onSubmit={handleSubmit}
       className="mt-8 space-y-5">

        <div>
          <label className="text-slate-300">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your Name..."
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-slate-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-slate-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-slate-300">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="********"
            className="w-full mt-2 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Create Account
        </button>
      </form>

      <p className="text-center text-slate-400 mt-6">
        Already have an account?{" "}
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

export default SignupForm;