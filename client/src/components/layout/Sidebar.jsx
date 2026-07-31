// File: Sidebar.jsx

import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    FileText,
    Mic,
    Code2,
    BarChart3,
    History,
    FolderOpen,
    User,
    LogOut,
} from "lucide-react";

import SidebarItem from "../layout/SidebarItem";
import Logo from "../layout/Logo";
import { useSidebar } from "../../context/SidebarContext";

function Sidebar() {
    const { collapsed } = useSidebar();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <aside
            className={`
                fixed
                top-0
                left-0
                z-40
                h-screen
                py-8
                bg-slate-900
                border-r
                border-slate-800
                flex
                flex-col
                justify-between
                overflow-hidden
                transition-all
                duration-500
                ease-in-out
                ${collapsed ? "w-20" : "w-72"}
            `}
        >
            <div>
                <Logo />

                <nav className="mt-12 space-y-3">
                    <SidebarItem
                        to="/dashboard"
                        icon={LayoutDashboard}
                        title="Dashboard"
                    />

                    <SidebarItem
                        to="/resume"
                        icon={FileText}
                        title="Resume Analyzer"
                    />

                    <SidebarItem
                        to="/mock-interview"
                        icon={Mic}
                        title="Mock Interview"
                    />

                    <SidebarItem
                        to="/coding-round"
                        icon={Code2}
                        title="Coding Round"
                    />

                    <SidebarItem
                        to="/analytics"
                        icon={BarChart3}
                        title="Analytics"
                    />

                    <SidebarItem
                        to="/interview-history"
                        icon={History}
                        title="Interview History"
                    />

                    <SidebarItem
                        to="/resume-history"
                        icon={FolderOpen}
                        title="Resume History"
                    />
                </nav>
            </div>

            <div className="px-3 space-y-3 ">
                <div className="">
                     
                     <SidebarItem
                    to="/profile"
                    icon={User}
                    title="Profile"
                />
                    
                </div>
           

                <button
                    type="button"
                    onClick={handleLogout}
                    className={`
                        w-full
                        flex
                        items-center
                        rounded-2xl
                        px-4
                        py-3
                        text-red-400
                        hover:bg-red-500
                        hover:text-white
                        overflow-hidden
                        transition-all
                        duration-500
                        ease-in-out
                        ${
                            collapsed
                                ? "justify-center"
                                : "justify-start"
                        }
                    `}
                >
                    <LogOut
                        size={20}
                        className="flex-shrink-0"
                    />

                    <span
                        className={`
                            overflow-hidden
                            whitespace-nowrap
                            transition-all
                            duration-500
                            ease-in-out
                            ${
                                collapsed
                                    ? "max-w-0 opacity-0 ml-0"
                                    : "max-w-[120px] opacity-100 ml-4"
                            }
                        `}
                    >
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;