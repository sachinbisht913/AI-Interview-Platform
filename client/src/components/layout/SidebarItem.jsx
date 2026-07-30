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

                `flex items-center ${
                    collapsed ? "justify-center" : "gap-4"
                } px-4 py-3 rounded-2xl transition-all duration-300

                ${
                    isActive
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`

            }

        >

            <Icon size={20} className="flex-shrink-0" />

            {

                !collapsed && (

                    <span className="font-medium">

                        {title}

                    </span>

                )

            }

        </NavLink>

    );

}

export default SidebarItem;