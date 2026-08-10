// File: src/components/interview/StrengthCard.jsx

import {
    ShieldCheck,
    CheckCircle2,
    Trophy,
    Star,
} from "lucide-react";

function StrengthCard({ strengths = [] }) {

    return (

        <section
            className="
                strength-card
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
                    -top-16
                    -right-16
                    h-40
                    w-40
                    rounded-full
                    bg-emerald-500/10
                    blur-3xl

                    sm:h-48
                    sm:w-48
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

                        sm:mb-8
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
                            from-emerald-500
                            to-green-500
                            shadow-lg

                            sm:h-14
                            sm:w-14
                        "
                    >

                        <ShieldCheck
                            size={24}
                            className="text-white sm:size-7"
                        />

                    </div>

                    <div className="min-w-0">

                        <h2
                            className="
                                strength-card-title
                                text-xl
                                font-bold

                                sm:text-2xl
                            "
                        >
                            Your Strengths
                        </h2>

                        <p
                            className="
                                strength-card-description
                                mt-1
                                text-sm
                                leading-6
                            "
                        >
                            These are the areas where you performed well
                            during your interview.
                        </p>

                    </div>

                </div>


                {/* Empty State */}

                {strengths.length === 0 ? (

                    <div
                        className="
                            strength-empty
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-700
                            px-4
                            py-10
                            text-center

                            sm:py-12
                        "
                    >

                        <p className="text-sm text-slate-500">
                            No strengths available.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3 sm:space-y-4">

                        {strengths.map((item, index) => (

                            <div
                                key={index}
                                className="
                                    strength-item
                                    group
                                    flex
                                    items-start
                                    gap-3
                                    rounded-2xl
                                    border
                                    border-slate-800
                                    bg-slate-950/60
                                    p-4

                                    sm:gap-4
                                    sm:p-5

                                    transition-all
                                    duration-300

                                    hover:border-emerald-500/30
                                    hover:bg-slate-800/40
                                "
                            >

                                {/* Icon */}

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-emerald-500/10

                                        sm:h-11
                                        sm:w-11
                                    "
                                >

                                    <CheckCircle2
                                        size={19}
                                        className="text-emerald-400"
                                    />

                                </div>


                                {/* Content */}

                                <div className="min-w-0 flex-1">

                                    <div
                                        className="
                                            mb-2
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <Star
                                            size={15}
                                            className="
                                                shrink-0
                                                text-yellow-400
                                            "
                                        />

                                        <span
                                            className="
                                                text-[11px]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-emerald-400

                                                sm:text-xs
                                            "
                                        >
                                            Strength {index + 1}
                                        </span>

                                    </div>


                                    <p
                                        className="
                                            strength-item-text
                                            break-words
                                            text-sm
                                            leading-6

                                            sm:leading-7
                                        "
                                    >
                                        {item}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Footer */}

                <div
                    className="
                        strength-footer
                        mt-6
                        rounded-2xl
                        border
                        border-emerald-500/20
                        bg-gradient-to-r
                        from-emerald-500/10
                        to-green-500/10
                        p-4

                        sm:mt-8
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

                        <Trophy
                            size={20}
                            className="
                                mt-1
                                shrink-0
                                text-yellow-400
                            "
                        />

                        <div className="min-w-0">

                            <h3
                                className="
                                    strength-footer-title
                                    text-sm
                                    font-semibold

                                    sm:text-base
                                "
                            >
                                Keep Building on These Strengths
                            </h3>

                            <p
                                className="
                                    strength-footer-text
                                    mt-2
                                    text-sm
                                    leading-6

                                    sm:leading-7
                                "
                            >
                                Your strongest skills are already helping you
                                perform well in interviews. Continue practicing
                                these areas while improving weaker topics to
                                become a well-rounded candidate for top
                                companies.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default StrengthCard;