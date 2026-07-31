// File: SidebarItem.jsx

import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

function SidebarItem({
    to,
    icon: Icon,
    title,
}) {
    const { collapsed } = useSidebar();

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                mx-3
                h-12
                flex
                items-center
                rounded-2xl
                overflow-hidden
                transition-all
                duration-500
                ease-in-out

                ${
                    collapsed
                        ? "justify-center px-0"
                        : "justify-start px-4"
                }

                ${
                    isActive
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
                `
            }
        >
            <div
                className={`
                    flex
                    items-center
                    justify-center
                    w-6
                    h-6
                    flex-shrink-0
                    transition-all
                    duration-500
                    ease-in-out
                    ${collapsed ? "" : "mr-4"}
                `}
            >
                <Icon size={20} />
            </div>

            <span
                className={`
                    overflow-hidden
                    whitespace-nowrap
                    transition-all
                    duration-500
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