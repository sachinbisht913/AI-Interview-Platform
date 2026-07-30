import { useNavigate } from "react-router-dom";
import { RotateCcw, LayoutDashboard } from "lucide-react";

function ActionButtons() {

    const navigate = useNavigate();

    return (

        <div className="flex justify-center gap-6 mt-14">

            <button

                onClick={() => navigate("/mock-interview")}

                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-7 py-4 rounded-2xl text-white font-semibold transition"

            >

                <RotateCcw size={20} />

                Retake Interview

            </button>

            <button

                onClick={() => navigate("/dashboard")}

                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-7 py-4 rounded-2xl text-white font-semibold transition"

            >

                <LayoutDashboard size={20} />

                Dashboard

            </button>

        </div>

    );

}

export default ActionButtons;