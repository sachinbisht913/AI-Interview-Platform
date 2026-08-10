// File: src/components/layout/Sidebar.jsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

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
    X,
} from "lucide-react";

import SidebarItem from "../layout/SidebarItem";
import Logo from "../layout/Logo";
import { useSidebar } from "../../context/SidebarContext";

function Sidebar() {

    const {
        collapsed,
        mobileOpen,
        closeMobileSidebar,
    } = useSidebar();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const handleLogout = () => {

        dispatch(logout());

        closeMobileSidebar();

        navigate("/login");

    };


    // Close mobile sidebar whenever route changes

    useEffect(() => {

        closeMobileSidebar();

    }, [location.pathname]);


    return (

        <>

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

                        light:bg-slate-900/30

                        lg:hidden
                    "
                />

            )}


            {/* Sidebar */}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    flex-col
                    justify-between
                    overflow-hidden

                    border-r
                    border-slate-800
                    bg-slate-900

                    light:border-slate-200
                    light:bg-white

                    py-6

                    transition-all
                    duration-500
                    ease-in-out

                    ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }

                    ${collapsed
                        ? "lg:w-20"
                        : "lg:w-72"
                    }

                    lg:translate-x-0
                    lg:py-8
                `}
            >

                {/* =====================================
                    Top
                ===================================== */}

                <div className="min-h-0">

                    {/* Logo + Mobile Close */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            px-4

                            lg:block
                            lg:px-0
                        "
                    >

                        <Logo />


                        <button
                            type="button"
                            onClick={closeMobileSidebar}
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl

                                text-slate-400

                                transition

                                hover:bg-slate-800
                                hover:text-white

                                light:text-slate-500
                                light:hover:bg-slate-100
                                light:hover:text-slate-900

                                lg:hidden
                            "
                            aria-label="Close navigation menu"
                        >

                            <X size={22} />

                        </button>

                    </div>


                    {/* Navigation */}

                    <nav
                        className="
                            mt-8
                            space-y-2
                            overflow-y-auto
                            px-2

                            sm:mt-10
                            sm:space-y-3
                            sm:px-3

                            lg:mt-12
                        "
                    >

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


                {/* =====================================
                    Bottom
                ===================================== */}

                <div
                    className="
                        space-y-2
                        px-2

                        sm:space-y-3
                        sm:px-3
                    "
                >

                    {/* Profile */}

                    <div>

                        <SidebarItem
                            to="/profile"
                            icon={User}
                            title="Profile"
                        />

                    </div>


                    {/* Logout */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className={`
                            flex
                            w-full
                            items-center
                            rounded-2xl
                            px-4
                            py-3

                            text-red-400

                            transition-all
                            duration-500
                            ease-in-out

                            hover:bg-red-500
                            hover:text-white

                            light:text-red-500
                            light:hover:bg-red-50
                            light:hover:text-red-600

                            ${collapsed
                                ? "lg:justify-center"
                                : "lg:justify-start"
                            }

                            justify-start
                        `}
                    >

                        <LogOut
                            size={20}
                            className="shrink-0"
                        />


                        <span
                            className={`
                                ml-4
                                overflow-hidden
                                whitespace-nowrap

                                transition-all
                                duration-500
                                ease-in-out

                                ${collapsed
                                    ? "lg:ml-0 lg:max-w-0 lg:opacity-0"
                                    : "lg:max-w-[120px] lg:opacity-100"
                                }
                            `}
                        >

                            Logout

                        </span>

                    </button>

                </div>

            </aside>

        </>

    );

}

export default Sidebar;