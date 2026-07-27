import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { Loader2 } from "lucide-react";

import { startInterview } from "../../api/interviewApi";

function StartInterviewButton({

    domain,
    difficulty,
    questions,

}) {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleStart = async () => {

        try {

            setLoading(true);

            const { data } = await startInterview({

                domain,

                difficulty,

                totalQuestions: questions,

            });

            toast.success("Interview Generated!");

            navigate("/interview-session", {

                state: {

                    interviewId: data.interviewId,

                    interview: data.interview,

                },

            });

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to generate interview."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <button

            onClick={handleStart}

            disabled={loading}

            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"

        >

            {

                loading

                ?

                <>

                    <Loader2 className="animate-spin" />

                    Generating Interview...

                </>

                :

                "Start AI Interview"

            }

        </button>

    );

}

export default StartInterviewButton;