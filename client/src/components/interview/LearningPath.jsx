// File: src/components/interview/LearningPath.jsx

import {
    BookOpen,
    GraduationCap,
    ArrowRight,
    Sparkles,
} from "lucide-react";

function LearningPath({ topics = [] }) {

    return (

        <section className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-slate-800
            bg-slate-900
            p-5
            sm:p-6
            lg:p-8
        ">

            {/* Background Glow */}

            <div className="
                absolute
                -top-16
                -right-16
                h-40
                w-40
                sm:h-48
                sm:w-48
                rounded-full
                bg-yellow-500/10
                blur-3xl
            " />

            <div className="relative z-10">

                {/* Header */}

                <div className="
                    mb-6
                    flex
                    items-start
                    gap-3
                    sm:mb-8
                    sm:gap-4
                ">

                    <div className="
                        flex
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-yellow-500
                        to-orange-500
                        shadow-lg
                    ">

                        <GraduationCap
                            size={24}
                            className="text-white sm:size-7"
                        />

                    </div>

                    <div className="min-w-0">

                        <h2 className="
                            text-xl
                            sm:text-2xl
                            font-bold
                            text-white
                        ">

                            Personalized Learning Path

                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            leading-6
                            text-slate-400
                        ">

                            AI-generated roadmap to improve your interview
                            performance.

                        </p>

                    </div>

                </div>

                {/* Empty State */}

                {topics.length === 0 ? (

                    <div className="
                        rounded-2xl
                        border
                        border-dashed
                        border-slate-700
                        px-4
                        py-10
                        sm:py-12
                        text-center
                    ">

                        <p className="text-sm text-slate-500">

                            No learning recommendations available.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-3 sm:space-y-5">

                        {topics.map((topic, index) => (

                            <div
                                key={index}
                                className="
                                    group
                                    flex
                                    items-start
                                    gap-3
                                    sm:gap-5
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    p-4
                                    sm:p-5
                                    transition-all
                                    duration-300
                                    hover:border-yellow-500/30
                                    hover:bg-slate-800/40
                                "
                            >

                                {/* Step Number */}

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    sm:h-12
                                    sm:w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    sm:rounded-2xl
                                    bg-gradient-to-r
                                    from-yellow-500
                                    to-orange-500
                                    text-sm
                                    sm:text-base
                                    font-bold
                                    text-white
                                ">

                                    {index + 1}

                                </div>

                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                    <div className="
                                        flex
                                        items-start
                                        gap-2
                                    ">

                                        <BookOpen
                                            size={18}
                                            className="mt-0.5 shrink-0 text-yellow-400"
                                        />

                                        <h3 className="
                                            text-sm
                                            sm:text-base
                                            font-semibold
                                            leading-6
                                            text-white
                                            break-words
                                        ">

                                            {topic}

                                        </h3>

                                    </div>

                                    <p className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        sm:leading-7
                                        text-slate-400
                                    ">

                                        Focus on mastering this topic through
                                        consistent practice, real-world
                                        projects, and interview questions. This
                                        will strengthen your overall interview
                                        readiness.

                                    </p>

                                </div>

                                {/* Arrow */}

                                <ArrowRight
                                    size={18}
                                    className="
                                        mt-1
                                        hidden
                                        shrink-0
                                        text-slate-600
                                        transition-all
                                        duration-300
                                        sm:block
                                        group-hover:translate-x-1
                                        group-hover:text-yellow-400
                                    "
                                />

                            </div>

                        ))}

                    </div>

                )}

                {/* AI Insight */}

                <div className="
                    mt-6
                    sm:mt-8
                    rounded-2xl
                    border
                    border-yellow-500/20
                    bg-gradient-to-r
                    from-yellow-500/10
                    to-orange-500/10
                    p-4
                    sm:p-5
                ">

                    <div className="
                        flex
                        items-start
                        gap-3
                    ">

                        <Sparkles
                            size={20}
                            className="mt-1 shrink-0 text-yellow-400"
                        />

                        <div className="min-w-0">

                            <h3 className="
                                text-sm
                                sm:text-base
                                font-semibold
                                text-white
                            ">

                                AI Recommendation

                            </h3>

                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                sm:leading-7
                                text-slate-300
                            ">

                                Follow this roadmap in sequence instead of
                                jumping between topics. Building a strong
                                foundation first and then moving to advanced
                                concepts will help you improve much faster and
                                perform better in technical interviews.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default LearningPath;