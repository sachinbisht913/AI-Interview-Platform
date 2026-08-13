import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../api/notificationApi";

function NotificationButton() {
    const { theme } = useTheme();

    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const unreadCount = notifications.filter(
        (notification) =>
            !Boolean(notification.is_read)
    ).length;


    // ========================================
    // Fetch Notifications
    // ========================================

    const fetchNotifications = async () => {

        try {

            setLoading(true);

            const { data } =
                await getNotifications();

            setNotifications(
                data.notifications || []
            );

        } catch (error) {

            console.error(
                "Failed to load notifications:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchNotifications();

    }, []);


    // ========================================
    // Close Dropdown Outside Click
    // ========================================

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // ========================================
    // Format Time
    // ========================================

    const formatTime = (date) => {

        const notificationDate =
            new Date(date);

        const now = new Date();

        const difference =
            Math.floor(
                (now - notificationDate) / 1000
            );

        if (difference < 60) {
            return "Just now";
        }

        if (difference < 3600) {

            const minutes =
                Math.floor(
                    difference / 60
                );

            return `${minutes}m ago`;

        }

        if (difference < 86400) {

            const hours =
                Math.floor(
                    difference / 3600
                );

            return `${hours}h ago`;

        }

        if (difference < 604800) {

            const days =
                Math.floor(
                    difference / 86400
                );

            return `${days}d ago`;

        }

        return notificationDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
            }
        );

    };


    // ========================================
    // Open Notification
    // ========================================

    const handleNotificationClick =
        async (notification) => {

            try {

                if (!Boolean(notification.is_read)) {

                    await markNotificationAsRead(
                        notification.id
                    );

                    setNotifications((prev) =>
                        prev.map((item) =>
                            item.id === notification.id
                                ? {
                                      ...item,
                                      is_read: 1,
                                  }
                                : item
                        )
                    );

                }

                setOpen(false);

                if (notification.link) {

                    navigate(notification.link);

                }

            } catch (error) {

                console.error(
                    "Failed to mark notification as read:",
                    error
                );

                toast.error(
                    "Unable to open notification."
                );

            }

        };


    // ========================================
    // Mark All As Read
    // ========================================

    const handleMarkAllAsRead = async () => {

        if (unreadCount === 0) {
            return;
        }

        try {

            await markAllNotificationsAsRead();

            setNotifications((prev) =>
                prev.map((notification) => ({
                    ...notification,
                    is_read: 1,
                }))
            );

            toast.success(
                "All notifications marked as read."
            );

        } catch (error) {

            console.error(
                "Failed to mark notifications:",
                error
            );

            toast.error(
                "Failed to mark notifications as read."
            );

        }

    };


    return (

        <div
            ref={dropdownRef}
            className="relative"
        >

            {/* Bell Button */}

            <button
                type="button"
                aria-label={`Notifications (${unreadCount})`}
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="
                    group
                    relative
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800/80
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:border-slate-600
                    hover:bg-slate-700
                    active:scale-95
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/20

                    light:border-slate-200
                    light:bg-slate-100
                    light:hover:border-slate-300
                    light:hover:bg-slate-200

                    sm:h-12
                    sm:w-12
                "
            >

                <Bell
                    size={19}
                    className="
                        text-slate-300
                        light:text-slate-600
                        transition-transform
                        duration-300
                        group-hover:rotate-12
                    "
                />

                {unreadCount > 0 && (

                    <>

                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-5
                                min-w-5
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                border-slate-900
                                bg-blue-600
                                px-1
                                text-[10px]
                                font-semibold
                                text-white
                                light:border-white
                            "
                        >
                            {unreadCount > 99
                                ? "99+"
                                : unreadCount}
                        </span>

                        <span
                            className="
                                pointer-events-none
                                absolute
                                -right-1
                                -top-1
                                h-5
                                w-5
                                rounded-full
                                bg-blue-500
                                opacity-30
                                animate-ping
                            "
                        />

                    </>

                )}

            </button>


            {/* Dropdown */}

            {open && (

                <div
                    className="
                        absolute
                        right-0
                        top-full
                        z-50
                        mt-3
                        w-[calc(100vw-2rem)]
                        max-w-sm
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-900
                        shadow-2xl
                        shadow-black/20
                        light:border-slate-200
                        light:bg-white
                    "
                >

                    {/* Header */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-800
                            px-4
                            py-4
                            light:border-slate-200
                        "
                    >

                        <div>

                        <h2
    className={`
        text-base
        font-semibold
        ${
            theme === "light"
                ? "text-slate-900"
                : "text-white"
        }
    `}
>
    Notifications
</h2>

                            {unreadCount > 0 && (

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    {unreadCount} unread
                                </p>

                            )}

                        </div>

                        {unreadCount > 0 && (

                            <button
                                type="button"
                                onClick={handleMarkAllAsRead}
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    px-2
                                    py-1.5
                                    text-xs
                                    font-medium
                                    text-blue-400
                                    transition
                                    hover:bg-blue-500/10
                                "
                            >

                                <CheckCheck size={15} />

                                Mark all read

                            </button>

                        )}

                    </div>


                    {/* Body */}

                    <div
                        className="
                            max-h-[420px]
                            overflow-y-auto
                        "
                    >

                        {loading ? (

                            <div
                                className="
                                    flex
                                    min-h-[180px]
                                    items-center
                                    justify-center
                                    px-5
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Loading notifications...
                            </div>

                        ) : notifications.length === 0 ? (

                            <div
                                className="
                                    flex
                                    min-h-[180px]
                                    flex-col
                                    items-center
                                    justify-center
                                    px-5
                                    text-center
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-slate-800
                                        light:bg-slate-100
                                    "
                                >

                                    <Bell
                                        size={21}
                                        className="
                                            text-slate-500
                                        "
                                    />

                                </div>

                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        font-medium
                                        text-slate-300
                                        light:text-slate-700
                                    "
                                >
                                    No notifications
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    You're all caught up.
                                </p>

                            </div>

                        ) : (

                            <div>

                                {notifications.map(
                                    (notification) => {

                                        const isUnread =
                                            !Boolean(
                                                notification.is_read
                                            );

                                        return (

                                            <button
                                                key={
                                                    notification.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        notification
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    w-full
                                                    gap-3
                                                    border-b
                                                    border-slate-800
                                                    px-4
                                                    py-4
                                                    text-left
                                                    transition
                                                    hover:bg-slate-800/70
                                                    light:border-slate-200
                                                    light:hover:bg-slate-50
                                                    ${
                                                        isUnread
                                                            ? "bg-blue-500/5"
                                                            : ""
                                                    }
                                                `}
                                            >

                                                {/* Status */}

                                                <div
                                                    className="
                                                        mt-1.5
                                                        shrink-0
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            block
                                                            h-2.5
                                                            w-2.5
                                                            rounded-full
                                                            ${
                                                                isUnread
                                                                    ? "bg-blue-500"
                                                                    : "bg-slate-700 light:bg-slate-300"
                                                            }
                                                        `}
                                                    />

                                                </div>


                                                {/* Content */}

                                                <div className="min-w-0 flex-1">

                                                    <div
                                                        className="
                                                            flex
                                                            items-start
                                                            justify-between
                                                            gap-3
                                                        "
                                                    >

                                                        <h3
                                                            className={`
                                                                text-sm
                                                                leading-5
                                                                ${
                                                                    isUnread
                                                                        ? "font-semibold text-white light:text-slate-900"
                                                                        : "font-medium text-slate-300 light:text-slate-700"
                                                                }
                                                            `}
                                                        >
                                                            {
                                                                notification.title
                                                            }
                                                        </h3>

                                                    </div>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-xs
                                                            leading-5
                                                            text-slate-500
                                                            light:text-slate-500
                                                        "
                                                    >
                                                        {
                                                            notification.message
                                                        }
                                                    </p>

                                                    <div
                                                        className="
                                                            mt-2
                                                            flex
                                                            items-center
                                                            gap-1.5
                                                            text-[11px]
                                                            text-slate-500
                                                        "
                                                    >

                                                        <Clock
                                                            size={12}
                                                        />

                                                        {
                                                            formatTime(
                                                                notification.created_at
                                                            )
                                                        }

                                                    </div>

                                                </div>

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default NotificationButton;