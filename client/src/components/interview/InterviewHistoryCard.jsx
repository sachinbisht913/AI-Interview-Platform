import { Eye, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InterviewHistoryCard({ interview }) {

    const navigate = useNavigate();

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-bold text-white">

                    {interview.domain} Interview

                </h2>

                <p className="text-slate-400 mt-2">

                    {interview.difficulty} • {interview.total_questions} Questions

                </p>

                <p className="text-slate-500 mt-1">

                    {new Date(interview.created_at).toLocaleDateString()}

                </p>

            </div>

            <div className="flex items-center gap-6">

                <div className="text-4xl font-bold text-blue-400">

                    {interview.overall_score ?? 0}%

                </div>

                <button

                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"

                    onClick={() =>
                        navigate(`/interview-report/${interview.id}`)
                    }

                >

                    <Eye />

                </button>

                <button

                    className="bg-slate-700 hover:bg-slate-600 p-3 rounded-xl"

                    onClick={() =>
                        navigate("/mock-interview")
                    }

                >

                    <RotateCcw />

                </button>

            </div>

        </div>

    );

}

export default InterviewHistoryCard;