// File: src/components/layout/UserMenu.jsx

import {
    ChevronDown,
    User,
    LogOut,
    Settings,
} from "lucide-react";

import {
    useSelector,
    useDispatch,
} from "react-redux";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/authSlice";

function UserMenu() {

    const { user } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);


    const handleLogout = () => {

        dispatch(logout());

        setOpen(false);

        navigate("/login");

    };


    const handleProfile = () => {

        setOpen(false);

        navigate("/profile");

    };


    return (

        <div className="relative">

            {/* User Button */}

            <button
                type="button"
                onClick={() =>
                    setOpen((prev) => !prev)
                }
                className="
                    user-menu-button
                    group
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800/80
                    px-2
                    py-2
                    transition-all
                    duration-300

                    hover:border-slate-600
                    hover:bg-slate-700
                    hover:shadow-lg
                    hover:shadow-blue-500/10

                    active:scale-[0.98]

                    sm:gap-3
                    sm:px-3
                "
            >

                {/* Avatar */}

                <div
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        to-violet-600
                        text-sm
                        font-bold
                        text-white
                        shadow-md

                        sm:h-11
                        sm:w-11
                        sm:text-lg
                    "
                >
                    {user?.fullName
                        ? user.fullName
                              .charAt(0)
                              .toUpperCase()
                        : "U"}
                </div>


                {/* User Info */}

                <div
                    className="
                        hidden
                        text-left
                        sm:block
                    "
                >

                    <h3
                        className="
                            user-menu-name
                            font-semibold
                            leading-5
                            text-white
                        "
                    >
                        {user?.fullName || "User"}
                    </h3>


                    <p
                        className="
                            user-menu-subtitle
                            text-xs
                            text-slate-400
                        "
                    >
                        Welcome Back 👋
                    </p>

                </div>


                {/* Arrow */}

                <ChevronDown
                    size={18}
                    className={`
                        user-menu-arrow
                        text-slate-400
                        transition-transform
                        duration-300

                        ${open ? "rotate-180" : ""}
                    `}
                />

            </button>


            {/* Dropdown */}

            {open && (

                <div
                    className="
                        user-menu-dropdown
                        absolute
                        right-0
                        top-full
                        z-50
                        mt-3
                        w-56
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-700
                        bg-slate-900
                        p-2
                        shadow-2xl
                    "
                >

                    {/* Profile */}

                    <button
                        type="button"
                        onClick={handleProfile}
                        className="
                            user-menu-item
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-left
                            text-slate-300
                            transition

                            hover:bg-slate-800
                            hover:text-white
                        "
                    >

                        <User size={18} />

                        <span>
                            Profile
                        </span>

                    </button>


                    {/* Settings */}

                    <button
                        type="button"
                        onClick={() => {

                            setOpen(false);

                            navigate("/settings");

                        }}
                        className="
                            user-menu-item
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-left
                            text-slate-300
                            transition

                            hover:bg-slate-800
                            hover:text-white
                        "
                    >

                        <Settings size={18} />

                        <span>
                            Settings
                        </span>

                    </button>


                    {/* Divider */}

                    <div
                        className="
                            user-menu-divider
                            my-2
                            border-t
                            border-slate-800
                        "
                    />


                    {/* Logout */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            user-menu-logout
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            text-left
                            text-red-400
                            transition

                            hover:bg-red-500/10
                            hover:text-red-300
                        "
                    >

                        <LogOut size={18} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            )}

        </div>

    );
}

export default UserMenu;