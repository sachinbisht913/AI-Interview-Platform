// File: src/pages/Settings.jsx

import { useTheme } from "../context/ThemeContext";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { deleteAccount } from "../api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
    getNotificationPreferences,
    updateNotificationPreferences,
} from "../api/notificationApi";

import {
    Settings as SettingsIcon,
    Palette,
    Bell,
    User,
    LockKeyhole,
    Trash2,
    LogOut,
    ShieldCheck,
    AlertTriangle,
    BellRing,
    BarChart3,
    FileCheck2,
    X,
} from "lucide-react";

function Settings() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { theme, setTheme } = useTheme();

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");

    };

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [deletePassword, setDeletePassword] =
        useState("");

    const [deleting, setDeleting] =
        useState(false);

        const [notifications, setNotifications] = useState({
            interviewReminders: true,
            interviewResults: true,
            resumeAnalysis: true,
        });
        
        const [notificationLoading, setNotificationLoading] =
            useState(true);

            useEffect(() => {

                const fetchNotificationPreferences = async () => {
            
                    try {
            
                        const { data } =
                            await getNotificationPreferences();
            
                        if (data?.preferences) {
            
                            setNotifications({
                                interviewReminders:
                                    Boolean(
                                        data.preferences.interview_reminders
                                    ),
            
                                interviewResults:
                                    Boolean(
                                        data.preferences.interview_results
                                    ),
            
                                resumeAnalysis:
                                    Boolean(
                                        data.preferences.resume_analysis
                                    ),
                            });
            
                        }
            
                    } catch (error) {
            
                        console.error(
                            "Failed to load notification preferences:",
                            error
                        );
            
                        toast.error(
                            "Failed to load notification preferences."
                        );
            
                    } finally {
            
                        setNotificationLoading(false);
            
                    }
            
                };
            
                fetchNotificationPreferences();
            
            }, []);    

    const handleDeleteAccount = async () => {

        try {

            setDeleting(true);

            await deleteAccount(deletePassword);

            // Clear Redux authentication
            dispatch(logout());

            // Clear local authentication data
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setShowDeleteModal(false);
            setDeletePassword("");

            toast.success(
                "Your account has been deleted."
            );

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete account."
            );

        } finally {

            setDeleting(false);

        }

    };

    const toggleNotification = async (key) => {

        const updated = {
            ...notifications,
            [key]: !notifications[key],
        };
    
        // Update UI immediately
        setNotifications(updated);
    
        try {
    
            await updateNotificationPreferences({
                interview_reminders:
                    updated.interviewReminders,
            
                interview_results:
                    updated.interviewResults,
            
                resume_analysis:
                    updated.resumeAnalysis,
            });
    
            toast.success("Notification preference updated.");
    
        } catch (error) {
    
            console.error(
                "Failed to update notification preference:",
                error
            );
    
            // Revert UI if backend update fails
            setNotifications(notifications);
    
            toast.error(
                error.response?.data?.message ||
                "Failed to update notification preference."
            );
    
        }
    
    };
    return (

        <div
            className="
                settings-page
                mx-auto
                w-full
                max-w-5xl
                space-y-8
            "
        >

            {/* ==========================================
                Page Header
            ========================================== */}

            <div>

                <div className="flex items-center gap-3">

                    <div
                        className="
                            settings-icon-box
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            border
                        "
                    >

                        <SettingsIcon
                            size={22}
                            className="settings-icon"
                        />

                    </div>

                    <div>

                        <h1
                            className="
                                settings-title
                                text-2xl
                                font-bold
                                sm:text-3xl
                            "
                        >
                            Settings
                        </h1>

                        <p
                            className="
                                settings-muted
                                mt-1
                                text-sm
                                sm:text-base
                            "
                        >
                            Manage your application preferences.
                        </p>

                    </div>

                </div>

            </div>


            {/* ==========================================
                Appearance
            ========================================== */}

            <section
                className="
                    settings-card
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                <div className="flex items-start gap-4">

                    <div
                        className="
                            settings-icon-box
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                        "
                    >

                        <Palette
                            size={20}
                            className="settings-icon"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                settings-title
                                text-lg
                                font-semibold
                            "
                        >
                            Appearance
                        </h2>

                        <p
                            className="
                                settings-muted
                                mt-1
                                text-sm
                            "
                        >
                            Customize how the application looks.
                        </p>

                    </div>

                </div>


                {/* Theme */}

                <div
                    className="
                        settings-sub-card
                        mt-6
                        rounded-2xl
                        border
                        p-5
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div>

                            <p className="settings-title font-medium">
                                Theme
                            </p>

                            <p className="settings-muted mt-1 text-sm">
                                Choose how the application should appear.
                            </p>

                        </div>


                        {/* Theme Switch */}

                        <div
                            className="
                                settings-theme-switch
                                flex
                                w-full
                                rounded-xl
                                border
                                p-1
                                sm:w-auto
                            "
                        >

                            {/* Dark */}

                            <button
                                type="button"
                                onClick={() =>
                                    setTheme("dark")
                                }
                                className={`
                                    flex-1
                                    rounded-lg
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition
                                    sm:flex-none
                                    ${
                                        theme === "dark"
                                            ? "settings-theme-active"
                                            : "settings-theme-inactive"
                                    }
                                `}
                            >
                                Dark
                            </button>


                            {/* Light */}

                            <button
                                type="button"
                                onClick={() =>
                                    setTheme("light")
                                }
                                className={`
                                    flex-1
                                    rounded-lg
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-medium
                                    transition
                                    sm:flex-none
                                    ${
                                        theme === "light"
                                            ? "settings-theme-active"
                                            : "settings-theme-inactive"
                                    }
                                `}
                            >
                                Light
                            </button>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                Account & Security
            ========================================== */}

            <section
                className="
                    settings-card
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                {/* Header */}

                <div className="flex items-start gap-4">

                    <div
                        className="
                            settings-icon-box
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                        "
                    >

                        <ShieldCheck
                            size={20}
                            className="settings-icon"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                settings-title
                                text-lg
                                font-semibold
                            "
                        >
                            Account & Security
                        </h2>

                        <p
                            className="
                                settings-muted
                                mt-1
                                text-sm
                            "
                        >
                            Manage your profile, password, and account security.
                        </p>

                    </div>

                </div>


                {/* Account Actions */}

                <div className="mt-6 space-y-4">


                    {/* Profile */}

                    <div
                        className="
                            settings-sub-card
                            flex
                            flex-col
                            gap-4
                            rounded-2xl
                            border
                            p-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div className="flex items-start gap-4">

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-500/10
                                "
                            >

                                <User
                                    size={20}
                                    className="text-blue-400"
                                />

                            </div>

                            <div>

                                <p className="settings-title font-medium">
                                    Profile
                                </p>

                                <p className="settings-muted mt-1 text-sm">
                                    View and update your personal information.
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-700
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-300
                                transition
                                hover:border-blue-500
                                hover:text-blue-400
                                sm:w-auto
                            "
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            Manage Profile
                        </button>

                    </div>


                    {/* Change Password */}

                    <div
                        className="
                            settings-sub-card
                            flex
                            flex-col
                            gap-4
                            rounded-2xl
                            border
                            p-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div className="flex items-start gap-4">

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-violet-500/10
                                "
                            >

                                <LockKeyhole
                                    size={20}
                                    className="text-violet-400"
                                />

                            </div>

                            <div>

                                <p className="settings-title font-medium">
                                    Change Password
                                </p>

                                <p className="settings-muted mt-1 text-sm">
                                    Update your password to keep your account secure.
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="
                                w-full
                                rounded-xl
                                border
                                border-slate-700
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-300
                                transition
                                hover:border-violet-500
                                hover:text-violet-400
                                sm:w-auto
                            "
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            Change Password
                        </button>

                    </div>


                    {/* Logout */}

                    <div
                        className="
                            settings-sub-card
                            flex
                            flex-col
                            gap-4
                            rounded-2xl
                            border
                            p-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div className="flex items-start gap-4">

                            <div
                                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-amber-500/10
                                "
                            >

                                <LogOut
                                    size={20}
                                    className="text-amber-400"
                                />

                            </div>

                            <div>

                                <p className="settings-title font-medium">
                                    Logout
                                </p>

                                <p className="settings-muted mt-1 text-sm">
                                    Sign out from this device.
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-amber-500/30
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-amber-400
                                transition
                                hover:bg-amber-500/10
                                sm:w-auto
                            "
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </section>


            {/* ==========================================
                Notifications
            ========================================== */}

            <section
                className="
                    settings-card
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                <div className="flex items-start gap-4">

                    <div
                        className="
                            settings-icon-box
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                        "
                    >

                        <Bell
                            size={20}
                            className="settings-icon"
                        />

                    </div>

                    <div>

                        <h2
                            className="
                                settings-title
                                text-lg
                                font-semibold
                            "
                        >
                            Notifications
                        </h2>

                        <p
                            className="
                                settings-muted
                                mt-1
                                text-sm
                            "
                        >
                            Manage notifications and reminders.
                        </p>

                    </div>

                </div>


                <div className="mt-6 space-y-3">

                    {/* Interview Reminders */}

                    <NotificationToggle
                        icon={BellRing}
                        iconColor="text-blue-400"
                        iconBg="bg-blue-500/10"
                        title="Interview Reminders"
                        description="Get reminders to practice your mock interviews."
                        enabled={
                            notifications.interviewReminders
                        }
                        onToggle={() =>
                            toggleNotification(
                                "interviewReminders"
                            )
                        }
                        disabled={notificationLoading}
                    />


                    {/* Interview Results */}

                    <NotificationToggle
                        icon={BarChart3}
                        iconColor="text-emerald-400"
                        iconBg="bg-emerald-500/10"
                        title="Interview Results"
                        description="Get notified when your interview evaluation is ready."
                        enabled={
                            notifications.interviewResults
                        }
                        onToggle={() =>
                            toggleNotification(
                                "interviewResults"
                            )
                        }
                        disabled={notificationLoading}
                    />


                    {/* Resume Analysis */}

                    <NotificationToggle
                        icon={FileCheck2}
                        iconColor="text-violet-400"
                        iconBg="bg-violet-500/10"
                        title="Resume Analysis"
                        description="Get notified when your resume analysis is completed."
                        enabled={
                            notifications.resumeAnalysis
                        }
                        onToggle={() =>
                            toggleNotification(
                                "resumeAnalysis"
                            )
                        }
                        disabled={notificationLoading}
                    />

                </div>

            </section>


            {/* ==========================================
                Danger Zone
            ========================================== */}

            <section
                className="
                    settings-danger-card
                    rounded-3xl
                    border
                    border-red-500/20
                    p-6
                    sm:p-8
                "
            >

                <div className="flex items-start gap-4">

                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-500/10
                        "
                    >

                        <AlertTriangle
                            size={20}
                            className="text-red-400"
                        />

                    </div>

                    <div className="min-w-0">

                        <h2
                            className="
                                settings-title
                                text-lg
                                font-semibold
                            "
                        >
                            Danger Zone
                        </h2>

                        <p
                            className="
                                settings-muted
                                mt-1
                                text-sm
                            "
                        >
                            Permanently delete your account and all associated data.
                        </p>

                    </div>

                </div>


                <div
                    className="
                        settings-danger-inner
                        mt-6
                        rounded-2xl
                        border
                        border-red-500/20
                        p-5
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >

                        <div className="min-w-0">

                            <p className="settings-title font-medium">
                                Delete Account
                            </p>

                            <p
                                className="
                                    settings-muted
                                    mt-1
                                    text-sm
                                    leading-6
                                "
                            >
                                This will permanently delete your profile,
                                interviews, resumes, analysis and other account data.
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                            className="
                                flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-red-600
                                px-5
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-red-700
                            "
                        >

                            <Trash2 size={18} />

                            Delete Account

                        </button>

                    </div>

                </div>

            </section>


            {/* ==========================================
                Delete Account Modal
            ========================================== */}

            {showDeleteModal && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/70
                        px-4
                        backdrop-blur-sm
                    "
                >

                    <div
                        className="
                            settings-modal
                            relative
                            w-full
                            max-w-md
                            rounded-3xl
                            border
                            p-6
                            shadow-2xl
                            sm:p-8
                        "
                    >

                        {/* Close */}

                        <button
                            type="button"
                            onClick={() => {

                                setShowDeleteModal(false);
                                setDeletePassword("");

                            }}
                            className="
                                absolute
                                right-4
                                top-4
                                rounded-lg
                                p-2
                                text-slate-400
                                transition
                                hover:bg-slate-800
                                hover:text-white
                            "
                        >

                            <X size={20} />

                        </button>


                        {/* Icon */}

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-500/10
                            "
                        >

                            <Trash2
                                size={24}
                                className="text-red-400"
                            />

                        </div>


                        <h2
                            className="
                                settings-title
                                mt-5
                                text-xl
                                font-bold
                            "
                        >
                            Delete your account?
                        </h2>


                        <p
                            className="
                                settings-muted
                                mt-2
                                text-sm
                                leading-6
                            "
                        >
                            This action permanently deletes your account,
                            interviews, resumes, analysis and associated data.
                            This cannot be undone.
                        </p>


                        {/* Password */}

                        <div className="mt-6">

                            <label
                                className="
                                    settings-title
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                "
                            >
                                Enter your password
                            </label>

                            <input
                                type="password"
                                value={deletePassword}
                                onChange={(e) =>
                                    setDeletePassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your password"
                                className="
                                    settings-input
                                    w-full
                                    rounded-xl
                                    border
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-red-500
                                    focus:ring-2
                                    focus:ring-red-500/20
                                "
                            />

                        </div>


                        {/* Buttons */}

                        <div
                            className="
                                mt-6
                                flex
                                flex-col-reverse
                                gap-3
                                sm:flex-row
                                sm:justify-end
                            "
                        >

                            <button
                                type="button"
                                onClick={() => {

                                    setShowDeleteModal(false);
                                    setDeletePassword("");

                                }}
                                className="
                                    rounded-xl
                                    border
                                    border-slate-700
                                    px-5
                                    py-3
                                    text-sm
                                    font-medium
                                    text-slate-300
                                    transition
                                    hover:border-slate-600
                                    hover:text-white
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                disabled={
                                    deleting ||
                                    !deletePassword
                                }
                                onClick={
                                    handleDeleteAccount
                                }
                                className="
                                    rounded-xl
                                    bg-red-600
                                    px-5
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-red-700
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                {deleting
                                    ? "Deleting..."
                                    : "Permanently Delete"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}


/* ==========================================
   Notification Toggle
========================================== */

function NotificationToggle({
    icon: Icon,
    iconColor,
    iconBg,
    title,
    description,
    enabled,
    onToggle,
    disabled = false,
}) {

    return (

        <div
            className="
                settings-sub-card
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                p-4
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:p-5
            "
        >

            {/* Left */}

            <div className="flex min-w-0 items-start gap-4">

                <div
                    className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${iconBg}
                    `}
                >

                    <Icon
                        size={20}
                        className={iconColor}
                    />

                </div>

                <div className="min-w-0">

                    <p className="settings-title font-medium">
                        {title}
                    </p>

                    <p
                        className="
                            settings-muted
                            mt-1
                            text-sm
                            leading-6
                        "
                    >
                        {description}
                    </p>

                </div>

            </div>


            {/* Toggle */}

            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                aria-label={`Toggle ${title}`}
                onClick={onToggle}
                disabled={disabled}
                className={`
                    relative
                    h-7
                    w-12
                    shrink-0
                    rounded-full
                    transition-colors
                    duration-200
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    ${
                        enabled
                            ? "bg-blue-600"
                            : "bg-slate-400"
                    }
                `}
            >

                <span
                    className={`
                        absolute
                        top-1
                        h-5
                        w-5
                        rounded-full
                        bg-white
                        shadow-md
                        transition-all
                        duration-200
                        ${
                            enabled
                                ? "left-6"
                                : "left-1"
                        }
                    `}
                />

            </button>

        </div>

    );
}
export default Settings;