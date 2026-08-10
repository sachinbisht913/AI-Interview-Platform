// File: src/components/analytics/DomainChart.jsx

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";

import { PieChart } from "lucide-react";

const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
];

function DomainChart({ data = [] }) {

    const chartData = data.map((item) => ({
        domain: item.domain,
        score: Number(item.averageScore),
    }));

    return (

        <section
            className="
                domain-chart
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
                            domain-chart-title
                            text-xl
                            font-bold

                            sm:text-2xl
                        "
                    >
                        Domain Performance
                    </h2>

                    <p
                        className="
                            domain-chart-description
                            mt-1
                            text-sm
                            leading-6
                        "
                    >
                        Compare your performance across interview domains.
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
                        bg-violet-500/10

                        sm:h-12
                        sm:w-12
                    "
                >

                    <PieChart
                        size={20}
                        className="text-violet-400"
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

                    <BarChart
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
                            vertical={false}
                        />


                        <XAxis
                            dataKey="domain"
                            stroke="var(--chart-axis)"
                            tickLine={false}
                            axisLine={false}
                            tick={{
                                fill: "var(--chart-axis)",
                                fontSize: 11,
                            }}
                            interval={0}
                            angle={-20}
                            textAnchor="end"
                            height={55}
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


                        <Bar
                            dataKey="score"
                            radius={[8, 8, 0, 0]}
                        >

                            {chartData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                            index % COLORS.length
                                        ]
                                    }
                                />

                            ))}

                        </Bar>

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </section>

    );
}

export default DomainChart;