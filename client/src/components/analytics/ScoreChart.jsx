import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";



function ScoreChart({ data }) {

    return (

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 h-[350px]">

            <h2 className="text-white text-2xl font-bold mb-6">

                Score Trend

            </h2>

            <ResponsiveContainer width="100%" height="85%">

                <LineChart data={data.map((item,index)=>({

interview:index+1,

score:item.overall_score

}))}>

                    <XAxis dataKey="interview" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3B82F6"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ScoreChart;