// File: src/components/resume/SectionCard.jsx

import { CheckCircle, AlertTriangle } from "lucide-react";
import GlassCard from "../common/GlassCard";

function SectionCard({
    title,
    items,
    color,
}) {

    const positive = color.includes("green");

    return (

        <GlassCard className="p-5 sm:p-6 lg:p-8">

            <h2
                className={`
                    text-2xl
                    font-bold
                    sm:text-3xl
                    ${color}
                `}
            >
                {title}
            </h2>


            <div
                className="
                    mt-6
                    space-y-3

                    sm:mt-8
                    sm:space-y-4
                "
            >

                {items?.map((item, index) => (

                    <div
                        key={index}
                        className="
                            resume-section-item
                            flex
                            items-start
                            gap-3
                            rounded-2xl
                            bg-slate-800
                            p-4

                            sm:gap-4
                            sm:p-5
                        "
                    >

                        {positive ? (

                            <CheckCircle
                                className="
                                    mt-1
                                    shrink-0
                                    text-green-400
                                "
                                size={20}
                            />

                        ) : (

                            <AlertTriangle
                                className="
                                    mt-1
                                    shrink-0
                                    text-red-400
                                "
                                size={20}
                            />

                        )}


                        <p
                            className="
                                resume-section-text
                                min-w-0
                                break-words
                                text-sm
                                leading-6
                                text-slate-200

                                sm:text-base
                                sm:leading-7
                            "
                        >
                            {item}
                        </p>

                    </div>

                ))}

            </div>

        </GlassCard>

    );
}

export default SectionCard;