// File: src/components/layout/DashboardLayout.jsx

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

import { useSidebar } from "../../context/SidebarContext";

function DashboardLayout() {

    const {
        collapsed,
        mobileOpen,
        closeMobileSidebar,
    } = useSidebar();


    return (

        <div
            className="
                h-screen
                overflow-hidden
                bg-slate-950
                text-white
                transition-colors
                duration-300
                light:bg-slate-100
                light:text-slate-900
            "
        >

            {/* Sidebar */}

            <Sidebar />


            {/* Mobile Overlay */}

            {mobileOpen && (

                <div
                    onClick={closeMobileSidebar}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/60
                        backdrop-blur-sm
                        lg:hidden
                    "
                />

            )}


            {/* Main Content */}

            <div
               className={`
               flex
               h-screen
               flex-col
               transition-all
               duration-500
               ease-in-out
           
               ml-0
           
               ${collapsed
                   ? "lg:ml-20"
                   : "lg:ml-72"
               }
           `}
            >

                {/* Navbar */}

                <div className="sticky top-0 z-30">

                    <TopNavbar />

                </div>


                {/* Page Content */}

                <main
                    className="
                        min-h-0
                        flex-1
                        overflow-x-hidden
                        overflow-y-auto

                        p-4
                        sm:p-6
                        lg:p-8
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;