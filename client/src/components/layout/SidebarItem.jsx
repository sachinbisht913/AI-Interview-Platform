// File: src/components/layout/SidebarItem.jsx

import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

function SidebarItem({
    to,
    icon: Icon,
    title,
}) {

    const {
        collapsed,
        closeMobileSidebar,
    } = useSidebar();


    return (

        <NavLink
            to={to}
            onClick={closeMobileSidebar}
            className={({ isActive }) =>
                `
                    mx-0
                    flex
                    h-12
                    items-center
                    overflow-hidden
                    rounded-2xl
                    transition-all
                    duration-300
                    ease-in-out

                    ${
                        collapsed
                            ? "justify-center px-0"
                            : "justify-start px-4"
                    }

                    ${
                        isActive
                            ? `
                                bg-blue-600
                                text-white
                                shadow-lg
                                shadow-blue-500/10
                            `
                            : `
                                text-slate-400
                                hover:bg-slate-800
                                hover:text-white
                                light:text-slate-600
                                light:hover:bg-slate-200
                                light:hover:text-slate-900
                            `
                    }
                `
            }
        >

            {/* Icon */}

            <div
                className={`
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center

                    transition-all
                    duration-300
                    ease-in-out

                    ${
                        collapsed
                            ? "mr-0"
                            : "mr-4"
                    }
                `}
            >

                <Icon size={20} />

            </div>


            {/* Title */}

            <span
                className={`
                    overflow-hidden
                    whitespace-nowrap

                    transition-all
                    duration-300
                    ease-in-out

                    ${
                        collapsed
                            ? "max-w-0 opacity-0"
                            : "max-w-[180px] opacity-100"
                    }
                `}
            >

                {title}

            </span>

        </NavLink>

    );

}

export default SidebarItem;