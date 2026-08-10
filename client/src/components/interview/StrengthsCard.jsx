// File: src/components/interview/StrengthsCard.jsx

import {
    ShieldCheck,
    CheckCircle2,
    Trophy,
    Star,
} from "lucide-react";

function StrengthsCard({ strengths = [] }) {

    return (

        <section
            className="
                strengths-card
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
                    bg-emerald-500/10
                    blur-3xl

                    sm:h-52
                    sm:w-52
                "
            />


            <div className="relative z-10">

                {/* Header */}

                <div
                    className="
                        mb-8
                        flex
                        items-center
                        gap-4
                    "
                >

                    <div
                        className="
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-r
                            from-emerald-500
                            to-green-500
                            shadow-lg
                        "
                    >

                        <ShieldCheck
                            size={28}
                            className="text-white"
                        />

                    </div>


                    <div className="min-w-0">

                        <h2
                            className="
                                strengths-card-title
                                text-2xl
                                font-bold
                            "
                        >
                            Your Strengths
                        </h2>


                        <p
                            className="
                                strengths-card-description
                                mt-1
                                text-sm
                            "
                        >
                            Areas where you performed exceptionally well
                            during the interview.
                        </p>

                    </div>

                </div>


                {/* Empty State */}

                {strengths.length === 0 ? (

                    <div
                        className="
                            strengths-empty
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-700
                            py-12
                            text-center
                        "
                    >

                        <p className="text-slate-500">
                            No strengths available.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">

                        {strengths.map((strength, index) => (

                            <div
                                key={index}
                                className="
                                    strengths-item
                                    group
                                    flex
                                    items-start
                                    gap-4
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    p-5
                                    transition-all
                                    duration-300
                                    hover:border-emerald-500/30
                                    hover:bg-slate-800/40
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
                                        rounded-xl
                                        bg-emerald-500/10
                                    "
                                >

                                    <CheckCircle2
                                        size={20}
                                        className="text-emerald-400"
                                    />

                                </div>


                                <div className="flex-1 min-w-0">

                                    <div
                                        className="
                                            mb-2
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <Star
                                            size={16}
                                            className="text-yellow-400"
                                        />

                                        <span
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-emerald-400
                                            "
                                        >
                                            Strength {index + 1}
                                        </span>

                                    </div>


                                    <p
                                        className="
                                            strengths-item-text
                                            text-sm
                                            leading-7
                                        "
                                    >
                                        {strength}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Footer */}

                <div
                    className="
                        strengths-footer
                        mt-8
                        rounded-2xl
                        border
                        border-emerald-500/20
                        bg-gradient-to-r
                        from-emerald-500/10
                        to-green-500/10
                        p-5
                    "
                >

                    <div className="flex items-start gap-3">

                        <Trophy
                            size={20}
                            className="mt-1 shrink-0 text-yellow-400"
                        />


                        <div className="min-w-0">

                            <h3
                                className="
                                    strengths-footer-title
                                    font-semibold
                                "
                            >
                                Keep Building on These Strengths
                            </h3>


                            <p
                                className="
                                    strengths-footer-text
                                    mt-2
                                    text-sm
                                    leading-7
                                "
                            >
                                These strengths reflect your strongest
                                interview skills. Continue practicing them
                                consistently while improving weaker areas to
                                become a well-rounded candidate.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}

export default StrengthsCard;