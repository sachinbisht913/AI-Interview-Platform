// File: src/pages/Analytics.jsx

import { useEffect, useState } from "react";

import StatCard from "../components/analytics/StatCard";
import ScoreChart from "../components/analytics/ScoreChart";
import RecentInterviewTable from "../components/analytics/RecentInterviewTable";
import DomainChart from "../components/analytics/DomainChart";
import EmptyState from "../components/analytics/EmptyState";
import AnalyticsHero from "../components/analytics/AnalyticsHero";
import AIInsights from "../components/analytics/AIInsights";

import { getAnalytics } from "../api/analyticsApi";

import {
    ClipboardList,
    TrendingUp,
    Trophy,
} from "lucide-react";

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

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div
                className="
                    analytics-page
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-4
                    bg-slate-950
                "
            >

                <p
                    className="
                        analytics-loading-text
                        text-sm
                        text-white

                        sm:text-base
                    "
                >
                    Loading Analytics...
                </p>

            </div>

        );

    }


    if (!analytics) {

        return <EmptyState />;

    }


    return (

        <div
            className="
                analytics-page
                min-h-screen
                bg-slate-950
                px-4
                py-6

                sm:px-6
                sm:py-8

                lg:px-8
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                "
            >

                {/* =====================================
                    Hero
                ===================================== */}

                <AnalyticsHero
                    totalInterviews={analytics.totalInterviews}
                />


                {/* =====================================
                    Statistics
                ===================================== */}

                <div
                    className="
                        mt-6
                        grid
                        grid-cols-1
                        gap-4

                        sm:grid-cols-2
                        sm:gap-6

                        lg:mt-10
                        lg:grid-cols-3
                    "
                >

                    <StatCard
                        title="Total Interviews"
                        value={analytics.totalInterviews}
                        icon={ClipboardList}
                        color="text-blue-400"
                        change="Completed"
                    />


                    <StatCard
                        title="Average Score"
                        value={`${Math.round(
                            analytics.averageScore || 0
                        )}%`}
                        icon={TrendingUp}
                        color="text-emerald-400"
                        change="Overall Performance"
                    />


                    <StatCard
                        title="Best Score"
                        value={`${analytics.bestScore || 0}%`}
                        icon={Trophy}
                        color="text-yellow-400"
                        change="Highest Achievement"
                    />

                </div>


                {/* =====================================
                    Charts
                ===================================== */}

                <div
                    className="
                        mt-6
                        grid
                        grid-cols-1
                        gap-6

                        lg:mt-10
                        lg:grid-cols-2
                        lg:gap-8
                    "
                >

                    <ScoreChart
                        data={analytics.history}
                    />


                    <DomainChart
                        data={analytics.domains}
                    />

                </div>


                {/* =====================================
                    Recent Interviews
                ===================================== */}

                <div className="mt-6 lg:mt-10">

                    <RecentInterviewTable
                        data={analytics.recentInterviews}
                    />

                </div>


                {/* =====================================
                    AI Insights
                ===================================== */}

                <div className="mt-6 lg:mt-10">

                    <AIInsights
                        analytics={analytics}
                    />

                </div>

            </div>

        </div>

    );
}

export default Analytics;