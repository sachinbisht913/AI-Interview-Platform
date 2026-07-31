// File: UserMenu.jsx

import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

function UserMenu() {
    const { user } = useSelector((state) => state.auth);

    return (
        <button
            className="
                group
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-xl
                bg-slate-800/80
                border
                border-slate-700
                transition-all
                duration-300
                hover:bg-slate-700
                hover:border-slate-600
                hover:shadow-lg
                hover:shadow-blue-500/10
                active:scale-[0.98]
            "
        >
            {/* Avatar */}
            <div
                className="
                    w-11
                    h-11
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-violet-600
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                    text-lg
                    flex-shrink-0
                    shadow-md
                "
            >
                {user?.fullName
                    ? user.fullName.charAt(0).toUpperCase()
                    : "U"}
            </div>

            {/* User Info */}
            <div className="hidden sm:block text-left">
                <h3 className="text-white font-semibold leading-5">
                    {user?.fullName || "User"}
                </h3>

                <p className="text-xs text-slate-400">
                    Welcome Back 👋
                </p>
            </div>

            {/* Dropdown Icon */}
            <ChevronDown
                size={18}
                className="
                    text-slate-400
                    transition-transform
                    duration-300
                    group-hover:rotate-180
                "
            />
        </button>
    );
}

export default UserMenu;