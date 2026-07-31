// File: NotificationButton.jsx

import { Bell } from "lucide-react";

function NotificationButton() {
    const notificationCount = 3;

    return (
        <button
            className="
                relative
                w-12
                h-12
                rounded-xl
                bg-slate-800/80
                border
                border-slate-700
                flex
                items-center
                justify-center
                transition-all
                duration-300
                hover:bg-slate-700
                hover:border-slate-600
                hover:scale-105
                active:scale-95
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/20
            "
        >
            <Bell
                size={20}
                className="text-slate-300 transition-transform duration-300 group-hover:rotate-12"
            />

            {notificationCount > 0 && (
                <>
                    {/* Notification Badge */}
                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            min-w-[20px]
                            h-5
                            px-1
                            rounded-full
                            bg-blue-600
                            text-white
                            text-[10px]
                            font-semibold
                            flex
                            items-center
                            justify-center
                            border-2
                            border-slate-900
                        "
                    >
                        {notificationCount}
                    </span>

                    {/* Ping Animation */}
                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            w-5
                            h-5
                            rounded-full
                            bg-blue-500
                            animate-ping
                            opacity-30
                        "
                    />
                </>
            )}
        </button>
    );
}

export default NotificationButton;