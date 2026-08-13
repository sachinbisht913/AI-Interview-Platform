// File: src/pages/Dashboard.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WelcomeCard from "../components/Dashboard/WelcomeCard";
import StatsGrid from "../components/Dashboard/StatsGrid";
import PerformanceChart from "../components/Dashboard/PerformanceChart";
import RecentInterviews from "../components/Dashboard/RecentInterviews";
import RecommendationCard from "../components/Dashboard/RecommendationCard";
import QuickActions from "../components/Dashboard/QuickActions";

import { fetchDashboard } from "../redux/dashboardSlice";

function Dashboard() {
    const dispatch = useDispatch();

    const { dashboard, loading, error } = useSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    <p className="text-slate-400">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 sm:p-6">
               <h2 className="text-lg sm:text-xl font-semibold text-red-400">
                    Failed to load dashboard
                </h2>

                <p className="mt-2 text-sm sm:text-base text-slate-300">
                    {error}
                </p>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            <WelcomeCard
    user={dashboard.user}
    summary={dashboard.summary}
/>

            <StatsGrid stats={dashboard.stats} />

            <PerformanceChart data={dashboard.performance} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="order-2 xl:order-1 xl:col-span-2">
                    <RecentInterviews
                        interviews={dashboard.recentInterviews}
                    />
                </div>

                <div className="order-1 xl:order-2">

    <RecommendationCard
        recommendations={dashboard.recommendations}
    />

</div>
            </div>

            <QuickActions />
        </div>
    );
}

export default Dashboard;