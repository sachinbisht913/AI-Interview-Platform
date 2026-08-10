// File: src/components/dashboard/PerformanceChart.jsx

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";


function CustomTooltip({ active, payload }) {

    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <div
            className="
                performance-tooltip
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                px-4
                py-3
                shadow-xl
            "
        >

            <p className="text-sm text-slate-300">

                Score{" "}

                <span className="font-semibold text-blue-400">

                    {payload[0].value}%

                </span>

            </p>

        </div>
    );
}


function PerformanceChart({ data = [] }) {

    const latestScore =
        data.length > 0
            ? data[data.length - 1].score
            : 0;

    const firstScore =
        data.length > 0
            ? data[0].score
            : 0;

    const improvement = latestScore - firstScore;


    return (

        <section
            className="
                performance-chart
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6
            "
        >

            {/* Header */}

            <div
                className="
                    mb-6
                    flex
                    flex-col
                    gap-4

                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >

                <div>

                    <h2
                        className="
                            performance-title
                            text-xl
                            font-bold
                            text-white

                            sm:text-2xl
                        "
                    >
                        Performance Overview
                    </h2>


                    <p
                        className="
                            performance-description
                            mt-2
                            text-sm
                            text-slate-400

                            sm:text-base
                        "
                    >
                        Your interview performance over the last few attempts.
                    </p>

                </div>


                {/* Improvement */}

                <div
                    className={`
                        self-start
                        rounded-xl
                        border
                        px-4
                        py-2

                        ${
                            improvement >= 0
                                ? "border-emerald-500/20 bg-emerald-500/10"
                                : "border-red-500/20 bg-red-500/10"
                        }
                    `}
                >

                    <span
                        className={`
                            text-sm
                            font-medium

                            ${
                                improvement >= 0
                                    ? "text-emerald-400"
                                    : "text-red-400"
                            }
                        `}
                    >

                        {improvement >= 0 ? "↑" : "↓"}{" "}

                        {Math.abs(improvement)}% Overall

                    </span>

                </div>

            </div>


            {/* Empty State */}

            {data.length === 0 ? (

                <div
                    className="
                        flex
                        h-64
                        items-center
                        justify-center
                    "
                >

                    <p className="performance-empty text-slate-500">

                        No performance data available.

                    </p>

                </div>

            ) : (

                <div className="h-72 sm:h-80 lg:h-[350px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >

                            <defs>

                                <linearGradient
                                    id="scoreGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="5%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0.45}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#3b82f6"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>


                            {/* Grid */}

                            <CartesianGrid
                                stroke="var(--chart-grid)"
                                strokeDasharray="4 4"
                                vertical={false}
                            />


                            {/* X Axis */}

                            <XAxis
                                dataKey="day"
                                tick={{
                                    fill: "var(--chart-text)",
                                    fontSize: 12,
                                }}
                                tickMargin={10}
                                tickLine={false}
                                axisLine={false}
                            />


                            {/* Y Axis */}

                            <YAxis
                                domain={[0, 100]}
                                tick={{
                                    fill: "var(--chart-text)",
                                    fontSize: 12,
                                }}
                                width={35}
                                tickLine={false}
                                axisLine={false}
                            />


                            {/* Tooltip */}

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{
                                    stroke: "#3b82f6",
                                    strokeDasharray: "4 4",
                                }}
                            />


                            {/* Area */}

                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fill="url(#scoreGradient)"
                                activeDot={{
                                    r: 6,
                                    fill: "var(--chart-dot)",
                                    stroke: "#3b82f6",
                                    strokeWidth: 3,
                                }}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            )}

        </section>
    );
}

export default PerformanceChart;