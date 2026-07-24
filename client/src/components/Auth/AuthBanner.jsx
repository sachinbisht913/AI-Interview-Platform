function AuthBanner() {
    return (
      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white flex-col justify-center px-16">
        <h1 className="text-5xl font-bold mb-6">
          AI Interview Platform
        </h1>
  
        <p className="text-lg text-blue-100 mb-10">
          Prepare smarter with AI-powered interviews and resume analysis.
        </p>
  
        <div className="space-y-4 text-lg">
          <p>🚀 Mock Technical Interviews</p>
          <p>📄 AI Resume Analyzer</p>
          <p>🤖 Instant AI Feedback</p>
          <p>📊 Performance Analytics</p>
        </div>
      </div>
    );
  }
  
  export default AuthBanner;