import { useEffect, useState } from "react";

import StatCard from "../components/analytics/StatCard";
import ScoreChart from "../components/analytics/ScoreChart";
import RecentInterviewTable from "../components/analytics/RecentInterviewTable";
import DomainChart from "../components/analytics/DomainChart";
import EmptyState from "../components/analytics/EmptyState";

import { getAnalytics } from "../api/analyticsApi";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const { data } = await getAnalytics();

            setAnalytics(data.analytics);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

                Loading Analytics...

            </div>

        );

    }

    if (!analytics) {

        return <EmptyState />;

    }

    return (

        <div className="min-h-screen bg-slate-950 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-white">

                    Analytics Dashboard

                </h1>

                <p className="text-slate-400 mt-2">

                    Track your interview performance.

                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                    <StatCard
                        title="Total Interviews"
                        value={analytics.totalInterviews}
                    />

                    <StatCard
                        title="Average Score"
                        value={`${Math.round(analytics.averageScore || 0)}%`}
                    />

                    <StatCard
                        title="Best Score"
                        value={`${analytics.bestScore || 0}%`}
                    />

                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                <ScoreChart

data={analytics.history}

/>

                    <DomainChart data={analytics.domains} />

                </div>

                <div className="mt-10">

                <RecentInterviewTable

data={analytics.recent}

/>

                </div>

            </div>

        </div>

    );

}

export default Analytics;