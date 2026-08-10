// File: src/pages/InterviewHistory.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import HistoryHeader from "../components/history/HistoryHeader";
import HistoryStats from "../components/history/HistoryStats";
import HistoryFilters from "../components/history/HistoryFilters";
import HistoryCard from "../components/history/HistoryCard";
import EmptyHistory from "../components/history/EmptyHistory";

import { fetchHistory } from "../redux/historySlice";

function InterviewHistory() {

    const dispatch = useDispatch();

    const { interviews, loading } = useSelector(
        (state) => state.history
    );

    useEffect(() => {

        dispatch(fetchHistory());

    }, [dispatch]);


    if (loading) {

        return (

            <div
                className="
                    history-loading
                    min-h-screen
                    px-4
                    flex
                    items-center
                    justify-center
                    transition-colors
                    duration-300
                "
            >

                <p
                    className="
                        history-loading-text
                        text-sm

                        sm:text-base
                    "
                >
                    Loading...
                </p>

            </div>

        );

    }


    return (

        <main
            className="
                interview-history-page
                min-h-screen
                transition-colors
                duration-300
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    px-4
                    py-6

                    sm:px-6
                    sm:py-8

                    lg:px-8
                    lg:py-10
                "
            >

                <div
                    className="
                        space-y-6

                        sm:space-y-8
                    "
                >

                    {/* Header */}

                    <HistoryHeader />


                    {/* Statistics */}

                    <HistoryStats
                        interviews={interviews}
                    />


                    {/* Filters */}

                    <HistoryFilters />


                    {/* Interview History */}

                    {interviews.length === 0 ? (

                        <EmptyHistory />

                    ) : (

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-4

                                sm:gap-6
                            "
                        >

                            {interviews.map((item) => (

                                <HistoryCard
                                    key={item.id}
                                    interview={item}
                                />

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </main>

    );
}

export default InterviewHistory;