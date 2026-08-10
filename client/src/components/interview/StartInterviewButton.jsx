// File: src/components/interview/StartInterviewButton.jsx

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

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to generate interview."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <button
            type="button"
            onClick={handleStart}
            disabled={loading}
            className="
                start-interview-button
                flex
                w-full
                min-h-[54px]
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                via-purple-600
                to-pink-600
                px-5
                py-4
                text-base
                font-bold
                text-white
                transition-all
                duration-200
                hover:brightness-110
                disabled:cursor-not-allowed
                disabled:opacity-70

                sm:text-lg
            "
        >

            {loading ? (

                <>
                    <Loader2
                        size={20}
                        className="animate-spin"
                    />

                    <span className="truncate">
                        Generating Interview...
                    </span>
                </>

            ) : (

                "Start AI Interview"

            )}

        </button>

    );
}

export default StartInterviewButton;