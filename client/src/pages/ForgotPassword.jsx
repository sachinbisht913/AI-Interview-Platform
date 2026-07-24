import AuthBanner from "../components/Auth/AuthBanner";
import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <AuthBanner />

      <div className="flex-1 flex items-center justify-center p-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPassword;