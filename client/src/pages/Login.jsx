import AuthBanner from "../components/Auth/AuthBanner";
import LoginForm from "../components/Auth/LoginForm";

function Login() {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <AuthBanner />

      <div className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;