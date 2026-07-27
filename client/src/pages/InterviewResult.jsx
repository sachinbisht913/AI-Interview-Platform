import { useNavigate } from "react-router-dom";

function InterviewResult() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">

            <h1 className="text-5xl font-bold">

                Interview Completed 🎉

            </h1>

            <p className="text-slate-400 mt-5">

                AI evaluation will be added next.

            </p>

            <button

                onClick={() => navigate("/dashboard")}

                className="mt-10 bg-blue-600 px-8 py-4 rounded-xl"

            >

                Dashboard

            </button>

        </div>

    );

}

export default InterviewResult;