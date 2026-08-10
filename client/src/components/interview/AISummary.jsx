// File: src/components/interview/AISummary.jsx

import {
    BrainCircuit,
    Sparkles,
    MessageSquareText,
} from "lucide-react";

function AISummary({
    summary = "No AI summary available.",
}) {

    return (

        <section
            className="
                ai-summary
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
                    bg-violet-500/10
                    blur-3xl

                    sm:h-52
                    sm:w-52
                "
            />


            <div className="relative z-10">

                {/* Header */}

                <div
                    className="
                        mb-6
                        flex
                        items-start
                        gap-3

                        sm:gap-4
                    "
                >

                    <div
                        className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-500
                            to-violet-600
                            shadow-lg

                            sm:h-14
                            sm:w-14
                        "
                    >

                        <BrainCircuit
                            size={24}
                            className="text-white sm:size-7"
                        />

                    </div>


                    <div className="min-w-0">

                        <h2
                            className="
                                ai-summary-title
                                text-xl
                                font-bold

                                sm:text-2xl
                            "
                        >
                            AI Interview Summary
                        </h2>


                        <p
                            className="
                                ai-summary-description
                                mt-2
                                text-sm
                                leading-6
                            "
                        >
                            Personalized feedback generated after evaluating
                            your complete interview performance.
                        </p>

                    </div>

                </div>


                {/* Summary Card */}

                <div
                    className="
                        ai-summary-content
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-950/60
                        p-4

                        sm:p-6
                    "
                >

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <MessageSquareText
                            size={19}
                            className="shrink-0 text-blue-400"
                        />

                        <h3
                            className="
                                ai-summary-section-title
                                text-sm
                                font-semibold

                                sm:text-base
                            "
                        >
                            Overall Evaluation
                        </h3>

                    </div>


                    <p
                        className="
                            ai-summary-text
                            text-sm
                            leading-7

                            sm:text-base
                            sm:leading-8
                        "
                    >
                        {summary}
                    </p>

                </div>


                {/* AI Insight */}

                <div
                    className="
                        ai-summary-insight
                        mt-6
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-gradient-to-r
                        from-blue-500/10
                        to-violet-500/10
                        p-4

                        sm:mt-8
                        sm:p-5
                    "
                >

                    <div className="flex items-start gap-3">

                        <Sparkles
                            size={20}
                            className="
                                mt-1
                                shrink-0
                                text-violet-400
                            "
                        />


                        <div className="min-w-0">

                            <h3
                                className="
                                    ai-summary-insight-title
                                    text-sm
                                    font-semibold

                                    sm:text-base
                                "
                            >
                                AI Insight
                            </h3>


                            <p
                                className="
                                    ai-summary-insight-text
                                    mt-2
                                    text-sm
                                    leading-6

                                    sm:leading-7
                                "
                            >
                                This summary is generated using AI by analyzing
                                your communication, technical knowledge,
                                confidence, and problem-solving ability. Review
                                the strengths and improvement areas below to
                                maximize your interview performance.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default AISummary;