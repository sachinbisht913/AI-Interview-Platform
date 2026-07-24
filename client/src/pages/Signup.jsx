import AuthBanner from "../components/Auth/AuthBanner";
import SignupForm from "../components/Auth/SignupForm";

function Signup() {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <AuthBanner />

      <div className="flex-1 flex items-center justify-center p-6">
        <SignupForm />
      </div>
    </div>
  );
}

export default Signup;