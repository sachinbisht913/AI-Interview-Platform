import { useEffect, useState } from "react";
import { getHistory } from "../api/historyApi";
import InterviewHistoryCard from "../components/interview/InterviewHistoryCard";

function InterviewHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        const { data } = await getHistory();

        setHistory(data.interviews);

    };

    return (

        <div className="min-h-screen bg-slate-950">

            <div className="max-w-6xl mx-auto py-12 px-6">

                <h1 className="text-4xl font-bold text-white">

                    Interview History

                </h1>

                <div className="space-y-6 mt-10">

                    {

                        history.map((item) => (

                            <InterviewHistoryCard

                                key={item.id}

                                interview={item}

                            />

                        ))

                    }

                </div>

            </div>

        </div>

    );

}

export default InterviewHistory;