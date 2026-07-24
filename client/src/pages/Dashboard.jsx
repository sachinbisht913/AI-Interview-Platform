import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import StatCard from "../components/Dashboard/StatCard";
import RecentInterviews from "../components/Dashboard/RecentInterviews";
import PerformanceOverview from "../components/Dashboard/PerformanceOverview";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Total Interviews"
              value="18"
              color="text-blue-400"
            />

            <StatCard title="Completed" value="15" color="text-green-400" />

            <StatCard title="ATS Score" value="85%" color="text-yellow-400" />

            <StatCard
              title="Coding Score"
              value="92%"
              color="text-purple-400"
            />
            <RecentInterviews />

            <PerformanceOverview />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
