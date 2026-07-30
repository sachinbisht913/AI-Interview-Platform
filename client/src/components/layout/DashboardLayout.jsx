import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import { useSidebar } from "../../context/SidebarContext";

function DashboardLayout() {

    const { collapsed } = useSidebar();

    return (

        <div className="h-screen bg-slate-950 overflow-hidden">

            {/* Fixed Sidebar */}

            <Sidebar />

            {/* Right Section */}

            <div
                className={`
                    h-screen flex flex-col
                    transition-all duration-300
                    ${collapsed ? "ml-20" : "ml-72"}
                `}
            >

                {/* Fixed Top Navbar */}

                <div className="sticky top-0 z-50">

                    <TopNavbar />

                </div>

                {/* Scrollable Content */}

                <main className="flex-1 overflow-y-auto p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;