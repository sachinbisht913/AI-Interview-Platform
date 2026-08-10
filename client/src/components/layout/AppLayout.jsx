// File: AppLayout.jsx

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSidebar } from "../../context/SidebarContext";

function AppLayout({ children }) {
    const { collapsed } = useSidebar();

    return (
        <div className="min-h-screen bg-slate-950">
            
            <Sidebar />

            {/* Main Area */}
            <div
                className={`
                    min-h-screen
                    transition-all
                    duration-500
                    ease-in-out

                    lg:ml-72
                    ${collapsed ? "lg:ml-20" : ""}
                `}
            >
                <Navbar />

                <main
                    className="
                        min-w-0
                        overflow-x-hidden
                        p-4
                        sm:p-6
                        lg:p-10
                    "
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;