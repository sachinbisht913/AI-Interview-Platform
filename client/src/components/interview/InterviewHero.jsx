import {
    Trophy,
    Sparkles,
    CheckCircle2,
} from "lucide-react";

function InterviewHero({
    overallScore = 0,
    userName = "User",
}) {

    const getMessage = () => {

        if (overallScore >= 90)
            return "Outstanding Performance!";

        if (overallScore >= 75)
            return "Great Job!";

        if (overallScore >= 60)
            return "Good Attempt!";

        return "Keep Practicing!";

    };


    const getDescription = () => {

        if (overallScore >= 90)
            return "You demonstrated excellent technical knowledge and communication skills. You're interview ready.";

        if (overallScore >= 75)
            return "You performed well. A few improvements can significantly boost your interview performance.";

        if (overallScore >= 60)
            return "You have a solid foundation. Continue practicing weak areas to improve your confidence.";

        return "Every interview is a learning opportunity. Keep practicing and you'll improve quickly.";

    };


    return (

        <section
            className="
                interview-hero
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-gradient-to-br
                from-slate-900
                via-slate-900
                to-blue-950
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
                    h-48
                    w-48
                    rounded-full
                    bg-blue-500/10
                    blur-3xl

                    sm:h-64
                    sm:w-64
                "
            />

            <div
                className="
                    absolute
                    -bottom-24
                    -left-16
                    h-48
                    w-48
                    rounded-full
                    bg-violet-500/10
                    blur-3xl

                    sm:h-64
                    sm:w-64
                "
            />


            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    gap-8

                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                "
            >

                {/* Left */}

                <div className="max-w-3xl">

                    {/* Completed Badge */}

                    <div
                        className="
                            mb-5
                            inline-flex
                            max-w-full
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-3
                            py-2

                            sm:px-4
                        "
                    >

                        <CheckCircle2
                            size={17}
                            className="shrink-0 text-emerald-400"
                        />

                        <span
                            className="
                                text-xs
                                font-medium
                                text-emerald-300

                                sm:text-sm
                            "
                        >
                            Interview Completed Successfully
                        </span>

                    </div>


                    {/* Greeting */}

                    <h1
                        className="
                            interview-hero-title
                            text-3xl
                            font-bold
                            leading-tight

                            sm:text-4xl

                            lg:text-5xl
                        "
                    >
                        Congratulations,

                        <span
                            className="
                                bg-gradient-to-r
                                from-blue-400
                                to-violet-400
                                bg-clip-text
                                text-transparent
                            "
                        >
                            {" "}
                            {userName}
                        </span>

                        {" "}🎉
                    </h1>


                    {/* Performance Message */}

                    <h2
                        className="
                            interview-hero-message
                            mt-4
                            text-xl
                            font-semibold

                            sm:text-2xl
                        "
                    >
                        {getMessage()}
                    </h2>


                    {/* Description */}

                    <p
                        className="
                            interview-hero-description
                            mt-4
                            max-w-2xl
                            text-sm
                            leading-7

                            sm:text-base
                            sm:leading-8

                            lg:text-lg
                        "
                    >
                        {getDescription()}
                    </p>

                </div>


                {/* Right - Score */}

                <div
                    className="
                        flex
                        shrink-0
                        justify-center

                        lg:justify-end
                    "
                >

                    <div
                        className="
                            interview-hero-score
                            relative
                            flex
                            h-44
                            w-44
                            items-center
                            justify-center
                            rounded-full
                            border-8
                            border-blue-500/20
                            bg-slate-900
                            shadow-2xl

                            sm:h-52
                            sm:w-52
                        "
                    >

                        <div
                            className="
                                interview-hero-score-ring
                                absolute
                                inset-3
                                rounded-full
                                border
                                border-slate-700
                            "
                        />


                        <div className="relative text-center">

                            <div className="flex justify-center">

                                <Trophy
                                    size={28}
                                    className="text-yellow-400 sm:size-[34px]"
                                />

                            </div>


                            <h2
                                className="
                                    mt-3
                                    text-4xl
                                    font-bold
                                    text-white

                                    sm:text-5xl
                                "
                            >
                                {overallScore}%
                            </h2>


                            <p
                                className="
                                    interview-hero-score-label
                                    mt-1
                                    text-xs

                                    sm:text-sm
                                "
                            >
                                Overall Score
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Bottom Banner */}

            <div
                className="
                    interview-hero-banner
                    relative
                    z-10
                    mt-8
                    rounded-2xl
                    border
                    border-blue-500/20
                    bg-blue-500/10
                    p-4

                    sm:mt-10
                    sm:p-5
                "
            >

                <div
                    className="
                        flex
                        items-start
                        gap-3
                    "
                >

                    <Sparkles
                        size={20}
                        className="mt-1 shrink-0 text-blue-400"
                    />


                    <div className="min-w-0">

                        <h3
                            className="
                                interview-hero-banner-title
                                text-sm
                                font-semibold

                                sm:text-base
                            "
                        >
                            AI Evaluation Complete
                        </h3>


                        <p
                            className="
                                interview-hero-banner-text
                                mt-2
                                text-sm
                                leading-6

                                sm:leading-7
                            "
                        >
                            Your interview has been evaluated using our AI
                            engine. Explore your strengths, improvement areas,
                            detailed feedback, and personalized learning
                            recommendations in the report below.
                        </p>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default InterviewHero;