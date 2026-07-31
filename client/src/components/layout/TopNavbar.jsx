// File: TopNavbar.jsx

import { useLocation } from "react-router-dom";
import {
    PanelLeftClose,
    PanelLeftOpen,
    Search,
} from "lucide-react";

import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";
import { useSidebar } from "../../context/SidebarContext";

function TopNavbar() {
    const { collapsed, toggleSidebar } = useSidebar();
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/dashboard":
                return "Dashboard";

            case "/resume":
                return "Resume Analyzer";

            case "/mock-interview":
                return "Mock Interview";

            case "/coding-round":
                return "Coding Round";

            case "/analytics":
                return "Analytics";

            case "/interview-history":
                return "Interview History";

            case "/resume-history":
                return "Resume History";

            case "/profile":
                return "Profile";

            default:
                return "AI Interview Platform";
        }
    };

    return (
        <header className="sticky top-0 z-40 h-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-5">
                <button
                    onClick={toggleSidebar}
                    className="group w-11 h-11 rounded-xl border border-slate-700 bg-slate-800/70 hover:bg-slate-700 transition-all duration-300 flex items-center justify-center"
                >
                    {collapsed ? (
                        <PanelLeftOpen
                            size={20}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    ) : (
                        <PanelLeftClose
                            size={20}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    )}
                </button>

                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {getPageTitle()}
                    </h1>

                    <p className="text-sm text-slate-400">
                        Welcome back! Let's continue your preparation.
                    </p>
                </div>
            </div>

            {/* Center Section */}
            <div className="hidden lg:flex flex-1 justify-center px-10">
                <div className="w-full max-w-xl">
                    <SearchBar />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <NotificationButton />

                <UserMenu />
            </div>
        </header>
    );
}

export default TopNavbar;