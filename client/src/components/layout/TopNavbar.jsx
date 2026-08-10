// File: src/components/layout/TopNavbar.jsx

import { useLocation } from "react-router-dom";

import {
    PanelLeftClose,
    PanelLeftOpen,
    Menu,
} from "lucide-react";

import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";

import { useSidebar } from "../../context/SidebarContext";

function TopNavbar() {

    const {
        collapsed,
        toggleSidebar,
        toggleMobileSidebar,
    } = useSidebar();

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

            case "/settings":
                return "Settings";

            default:
                return "AI Interview Platform";
        }

    };


    return (

        <header
            className="
                top-navbar
                sticky
                top-0
                z-30
                flex
                h-16
                items-center
                justify-between
                border-b
                border-slate-800
                bg-slate-900/90
                px-4
                backdrop-blur-md
                transition-colors
                duration-300

                sm:h-20
                sm:px-6

                lg:px-8
            "
        >

            {/* Left Section */}

            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-3

                    sm:gap-5
                "
            >

                {/* Mobile Menu */}

                <button
                    type="button"
                    onClick={toggleMobileSidebar}
                    className="
                        navbar-toggle-button
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800/70
                        text-slate-300
                        transition-all
                        duration-300

                        hover:bg-slate-700
                        hover:text-white

                        lg:hidden
                    "
                    aria-label="Open navigation menu"
                >
                    <Menu size={21} />
                </button>


                {/* Desktop Sidebar Toggle */}

                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="
                        navbar-toggle-button
                        group
                        hidden
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800/70
                        text-slate-300
                        transition-all
                        duration-300

                        hover:bg-slate-700
                        hover:text-white

                        lg:flex
                    "
                    aria-label={
                        collapsed
                            ? "Expand sidebar"
                            : "Collapse sidebar"
                    }
                >

                    {collapsed ? (

                        <PanelLeftOpen
                            size={20}
                            className="
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                    ) : (

                        <PanelLeftClose
                            size={20}
                            className="
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />

                    )}

                </button>


                {/* Page Title */}

                <div className="min-w-0">

                    <h1
                        className="
                            navbar-title
                            truncate
                            text-lg
                            font-bold
                            text-white
                            transition-colors
                            duration-300

                            sm:text-2xl
                        "
                    >
                        {getPageTitle()}
                    </h1>


                    <p
                        className="
                            navbar-subtitle
                            hidden
                            truncate
                            text-sm
                            text-slate-400
                            transition-colors
                            duration-300

                            sm:block
                        "
                    >
                        Welcome back! Let's continue your preparation.
                    </p>

                </div>

            </div>


            {/* Center Search */}

            <div
                className="
                    hidden
                    flex-1
                    justify-center
                    px-6

                    lg:flex
                    lg:px-8
                    xl:px-10
                "
            >

                <div className="w-full max-w-xl">

                    <SearchBar />

                </div>

            </div>


            {/* Right Section */}

            <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-2

                    sm:gap-4
                "
            >

                <NotificationButton />

                <UserMenu />

            </div>

        </header>

    );
}

export default TopNavbar;