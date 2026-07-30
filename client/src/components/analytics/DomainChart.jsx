import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";



function DomainChart({ data }) {

    return (

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 h-[350px]">

            <h2 className="text-white text-2xl font-bold mb-6">

                Domain Performance

            </h2>

            <ResponsiveContainer width="100%" height="85%">

                <BarChart data={data}>

                    <XAxis dataKey="domain" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="score" fill="#8B5CF6" />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default DomainChart;