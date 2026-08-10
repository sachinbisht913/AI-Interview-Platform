// File: src/pages/MockInterview.jsx

import InterviewSetup from "../components/interview/InterviewSetup";

function MockInterview() {

    return (

        <div
            className="
                mock-interview-page
                min-h-screen
                bg-slate-950
                px-4

                sm:px-6

                lg:px-8
            "
        >

            <InterviewSetup />

        </div>

    );
}

export default MockInterview;