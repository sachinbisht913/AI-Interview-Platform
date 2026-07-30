import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getInterviewReport } from "../api/historyApi";

function InterviewReport() {

    const { id } = useParams();

    const [report, setReport] = useState([]);

    useEffect(() => {

        fetchReport();

    }, []);

    const fetchReport = async () => {

        const { data } = await getInterviewReport(id);

        setReport(data.report);

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-4xl font-bold mb-10">

                Saved Interview Report

            </h1>

            {

                report.map((item)=>(

                    <div

                        key={item.id}

                        className="bg-slate-900 rounded-2xl p-8 mb-8"

                    >

                        <h2 className="text-2xl font-bold">

                            {item.question}

                        </h2>

                        <p className="mt-6">

                            {item.user_answer}

                        </p>

                        <div className="mt-6">

                            Score :

                            {item.score}

                        </div>

                        <div className="mt-3 text-slate-300">

                            {item.feedback}

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default InterviewReport;