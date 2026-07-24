import {
    LayoutDashboard,
    FileText,
    BrainCircuit,
    Code2,
    BarChart3,
    User
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "Resume Analyzer",
        icon: FileText,
        path: "/resume",
    },
    {
        title: "Mock Interview",
        icon: BrainCircuit,
        path: "/mock-interview",
    },
    {
        title: "Coding Round",
        icon: Code2,
        path: "/coding",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics",
    },
    {
        title: "Profile",
        icon: User,
        path: "/profile",
    },
];

function Sidebar() {

    return (

        <aside className="w-72 bg-slate-900 border-r border-slate-800 p-6">

            <h2 className="text-white text-xl font-bold mb-8">

                Navigation

            </h2>

            <div className="space-y-3">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-4 rounded-xl transition ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-300 hover:bg-slate-800"
                                }`
                            }
                        >

                            <Icon size={20} />

                            {item.title}

                        </NavLink>

                    );

                })}

            </div>

        </aside>

    );

}

export default Sidebar;