// File: src/components/interview/ScoreOverview.jsx

import ScoreCard from "./ScoreCard";

function ScoreOverview({
    overallScore = 0,
    technicalScore = 0,
    communicationScore = 0,
    confidenceScore = 0,
    problemSolvingScore = 0,
}) {

    return (

        <section className="mt-8 sm:mt-10">

            {/* Section Header */}

            <div className="mb-6 sm:mb-8">

                <h2
                    className="
                        score-overview-title
                        text-2xl
                        font-bold

                        sm:text-3xl
                    "
                >
                    Performance Overview
                </h2>

                <p
                    className="
                        score-overview-description
                        mt-2
                        max-w-3xl
                        text-sm
                        leading-6

                        sm:text-base
                        sm:leading-7
                    "
                >
                    A detailed breakdown of your interview performance across
                    different evaluation criteria.
                </p>

            </div>


            {/* Score Cards */}

            <div
                className="
                    grid
                    grid-cols-1
                    gap-4

                    sm:grid-cols-2
                    sm:gap-5

                    lg:grid-cols-3

                    xl:grid-cols-5
                    xl:gap-6
                "
            >

                <ScoreCard
                    title="Overall Score"
                    score={overallScore}
                    color="blue"
                    subtitle="Combined score based on all evaluation metrics."
                />

                <ScoreCard
                    title="Technical Skills"
                    score={technicalScore}
                    color="emerald"
                    subtitle="Knowledge of programming, concepts, and problem solving."
                />

                <ScoreCard
                    title="Communication"
                    score={communicationScore}
                    color="violet"
                    subtitle="Clarity, fluency, confidence, and explanation quality."
                />

                <ScoreCard
                    title="Confidence"
                    score={confidenceScore}
                    color="amber"
                    subtitle="Confidence while answering interview questions."
                />

                <ScoreCard
                    title="Problem Solving"
                    score={problemSolvingScore}
                    color="red"
                    subtitle="Logical thinking and solution approach."
                />

            </div>

        </section>

    );
}

export default ScoreOverview;