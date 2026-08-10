import "./App.css";
import { Route, Routes } from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import Resume from "./pages/Resume";
import MockInterview from "./pages/MockInterview";
import InterviewSession from "./pages/InterviewSession";
import InterviewResult from "./pages/InterviewResult";
import InterviewReport from "./pages/InterviewReport";
import Analytics from "./pages/Analytics";
import InterviewHistory from "./pages/InterviewHistory";
import DashboardLayout from "./components/layout/DashboardLayout";
import ResumeHistory from "./pages/ResumeHistory";
import ResumeReport from  "./pages/ResumeReport"
import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import Profile from "./pages/Profile";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";



function App() {
  return (
    <>
      <div>
        <Routes>
        
       
    <Route
        path="/login"
        element={<Login />}
    />
    <Route
        path="/signup"
        element={<Signup />}
    />
        <Route
    element={
        <ProtectedRoute>
            <DashboardLayout />
        </ProtectedRoute>
    }
>

    <Route
        path="/dashboard"
        element={<Dashboard />}
    />
     <Route
        path="/resume"
        element={<Resume />}
    />
    <Route
    path="/settings"
    element={<Settings />}
/>

    
    

    <Route
        path="/resume-analysis"
        element={<ResumeAnalysis />}
    />

    <Route
        path="/mock-interview"
        element={<MockInterview />}
    />

    <Route
        path="/interview-session"
        element={<InterviewSession />}
    />

    <Route
        path="/interview-result"
        element={<InterviewResult />}
    />

    <Route
        path="/interview-report/:id"
        element={<InterviewReport />}
    />

    <Route
        path="/analytics"
        element={<Analytics />}
    />

    <Route
        path="/interview-history"
        element={<InterviewHistory />}
    />
    <Route
    path="/profile"
    element={<Profile />}
/>

<Route
    path="/resume-history"
    element={<ResumeHistory />}
/>

<Route
    path="/resume-report/:id"
    element={<ResumeReport />}
/>

</Route>

<Route
        path="/500"
        element={<ServerError />}
    />

    {/* 404 - MUST BE LAST */}

    <Route
        path="*"
        element={<NotFound />}
    />

<Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

<Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>
        </Routes>
      </div>
    </>
  );
}

export default App;
