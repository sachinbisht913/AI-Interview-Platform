// File: src/components/interview/OverallFeedback.jsx

import { BrainCircuit } from "lucide-react";

function OverallFeedback({ feedback = "No overall feedback available." }) {
    return (
        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6

                lg:p-8
            "
        >

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-blue-500/10
                    blur-3xl

                    sm:h-52
                    sm:w-52
                "
            />

            <div className="relative z-10">

                {/* Header */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        sm:gap-4
                    "
                >

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-500/10

                            sm:h-12
                            sm:w-12
                        "
                    >

                        <BrainCircuit
                            className="
                                h-6
                                w-6
                                text-blue-400

                                sm:h-7
                                sm:w-7
                            "
                        />

                    </div>

                    <h2
                        className="
                            text-xl
                            font-bold
                            text-white

                            sm:text-2xl
                        "
                    >
                        Overall AI Feedback
                    </h2>

                </div>


                {/* Feedback */}

                <div
                    className="
                        mt-5
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-950/60
                        p-4

                        sm:mt-6
                        sm:p-6
                    "
                >

                    <p
                        className="
                            text-sm
                            leading-7
                            text-slate-300

                            sm:text-base
                            sm:leading-8
                        "
                    >
                        {feedback}
                    </p>

                </div>

            </div>

        </section>
    );
}

export default OverallFeedback;