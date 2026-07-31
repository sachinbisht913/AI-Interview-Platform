// File: src/pages/Dashboard.jsx


import WelcomeCard from "../components/Dashboard/WelcomeCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import PerformanceChart from "../components/Dashboard/PerformanceChart";
import RecentInterviews from "../components/dashboard/RecentInterviews";
import RecommendationCard from "../components/Dashboard/RecommendationCard";
import QuickActions from "../components/Dashboard/QuickActions";

function Dashboard() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <WelcomeCard />

            {/* Statistics */}
            <StatsGrid />

            {/* Performance Chart */}
            <PerformanceChart />

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <RecentInterviews />
                </div>

                <div>
                    <RecommendationCard />
                </div>
            </div>

            {/* Quick Actions */}
            <QuickActions />
        </div>
    );
}

export default Dashboard;