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

const data = [
    { day: "Mon", score: 72 },
    { day: "Tue", score: 78 },
    { day: "Wed", score: 75 },
    { day: "Thu", score: 82 },
    { day: "Fri", score: 88 },
    { day: "Sat", score: 85 },
    { day: "Sun", score: 91 },
];

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-xl">
                <p className="text-sm text-slate-300">
                    Score:{" "}
                    <span className="font-semibold text-blue-400">
                        {payload[0].value}%
                    </span>
                </p>
            </div>
        );
    }

    return null;
}

function PerformanceChart() {
    return (
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Performance Overview
                    </h2>

                    <p className="mt-1 text-slate-400">
                        Your interview scores over the last 7 days.
                    </p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                    <span className="text-sm font-medium text-emerald-400">
                        ↑ +14% Improvement
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
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

                        <CartesianGrid
                            stroke="#1e293b"
                            strokeDasharray="4 4"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="day"
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 13,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            domain={[50, 100]}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 13,
                            }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#3b82f6",
                                strokeWidth: 1,
                                strokeDasharray: "4 4",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fill="url(#scoreGradient)"
                            activeDot={{
                                r: 7,
                                stroke: "#3b82f6",
                                strokeWidth: 3,
                                fill: "#fff",
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}

export default PerformanceChart;