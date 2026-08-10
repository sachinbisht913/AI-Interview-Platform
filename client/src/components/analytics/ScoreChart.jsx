// File: src/components/analytics/ScoreChart.jsx

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { TrendingUp } from "lucide-react";

function ScoreChart({ data = [] }) {

    const chartData = data.map((item, index) => ({
        interview: index + 1,
        score: Number(item.overall_score),
    }));

    return (

        <section
            className="
                score-chart
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5
                sm:p-6
                transition-colors
                duration-300
            "
        >

            {/* Header */}

            <div
                className="
                    mb-6
                    flex
                    items-start
                    justify-between
                    gap-4
                    sm:mb-8
                "
            >

                <div className="min-w-0">

                    <h2
                        className="
                            score-chart-title
                            text-xl
                            font-bold
                            sm:text-2xl
                        "
                    >
                        Score Trend
                    </h2>

                    <p
                        className="
                            score-chart-description
                            mt-1
                            text-sm
                            leading-6
                        "
                    >
                        Track your interview scores over time.
                    </p>

                </div>


                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-blue-500/10

                        sm:h-12
                        sm:w-12
                    "
                >

                    <TrendingUp
                        className="text-blue-400"
                        size={20}
                    />

                </div>

            </div>


            {/* Chart */}

            <div
                className="
                    h-[260px]
                    w-full

                    sm:h-[320px]
                "
            >

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 5,
                            left: -15,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--chart-grid)"
                        />


                        <XAxis
                            dataKey="interview"
                            stroke="var(--chart-axis)"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fill: "var(--chart-axis)",
                                fontSize: 12,
                            }}
                        />


                        <YAxis
                            stroke="var(--chart-axis)"
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 10]}
                            tick={{
                                fill: "var(--chart-axis)",
                                fontSize: 12,
                            }}
                        />


                        <Tooltip
                            contentStyle={{
                                background: "var(--chart-tooltip-bg)",
                                border: "1px solid var(--chart-tooltip-border)",
                                borderRadius: "12px",
                                color: "var(--chart-tooltip-text)",
                                fontSize: "13px",
                            }}
                            labelStyle={{
                                color: "var(--chart-tooltip-text)",
                            }}
                            itemStyle={{
                                color: "var(--chart-tooltip-text)",
                            }}
                        />


                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#3b82f6",
                            }}
                            activeDot={{
                                r: 7,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </section>

    );
}

export default ScoreChart;