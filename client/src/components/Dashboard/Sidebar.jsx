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

function Sidebar() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");

    };

    return (

        <aside  className={`
        fixed left-0 top-0 h-screen
        bg-slate-900 border-r border-slate-800
        flex flex-col justify-between
        transition-all duration-300
        ${collapsed ? "w-20" : "w-72"}
    `}>

            <div>

                <Logo />

                <div className="mt-12 space-y-3">

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

                </div>

            </div>

            <div className="space-y-4">

                <SidebarItem
                    to="/profile"
                    icon={User}
                    title="Profile"
                />

                <button

                    onClick={handleLogout}

                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition"

                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;