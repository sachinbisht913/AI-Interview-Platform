// File: src/pages/Profile.jsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    User,
    Mail,
    ShieldCheck,
    CalendarDays,
    Lock,
    Save,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import {
    getProfile,
    updateProfile,
    changePassword,
} from "../api/profileApi";

function Profile() {
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [passwordSaving, setPasswordSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [form, setForm] = useState({
        fullName: "",
        email: "",
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });


    // ==========================================
    // Fetch Profile
    // ==========================================

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await getProfile();

                setProfile(data.user);

                setForm({
                    fullName: data.user.fullName || "",
                    email: data.user.email || "",
                });
            } catch (error) {
                console.error("Profile Error:", error);

                setError(
                    error.response?.data?.message ||
                    error.apiMessage ||
                    "Failed to load profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    // ==========================================
    // Profile Form Change
    // ==========================================

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    // ==========================================
    // Password Form Change
    // ==========================================

    const handlePasswordChange = (e) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value,
        });
    };


    // ==========================================
    // Update Profile
    // ==========================================

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!form.fullName.trim() || !form.email.trim()) {
            setError("Full name and email are required.");
            return;
        }

        try {
            setSaving(true);

            const { data } = await updateProfile({
                fullName: form.fullName.trim(),
                email: form.email.trim(),
            });

            setProfile((prev) => ({
                ...prev,
                fullName: data.user.fullName,
                email: data.user.email,
            }));

            setMessage("Profile updated successfully.");
        } catch (error) {
            console.error(
                "Update Profile Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.apiMessage ||
                "Failed to update profile."
            );
        } finally {
            setSaving(false);
        }
    };


    // ==========================================
    // Change Password
    // ==========================================

    const handleChangePassword = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = passwordForm;

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setError(
                "Please fill in all password fields."
            );
            return;
        }

        if (newPassword.length < 6) {
            setError(
                "New password must contain at least 6 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(
                "New passwords do not match."
            );
            return;
        }

        if (currentPassword === newPassword) {
            setError(
                "New password must be different from your current password."
            );
            return;
        }

        try {
            setPasswordSaving(true);

            const { data } = await changePassword({
                currentPassword,
                newPassword,
            });

            toast.success(
                data.message ||
                "Password changed successfully."
            );

            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error(
                "Change Password Error:",
                error
            );

            toast.error(
                error.response?.data?.message ||
                error.apiMessage ||
                "Failed to change password."
            );
        } finally {
            setPasswordSaving(false);
        }
    };


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="profile-page flex min-h-[70vh] items-center justify-center">

                <div className="flex flex-col items-center gap-4">

                    <div
                        className="
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-blue-500
                            border-t-transparent
                        "
                    />

                    <p className="profile-muted text-sm">
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // Profile Not Found
    // ==========================================

    if (!profile) {
        return (
            <div
                className="
                    profile-error
                    rounded-2xl
                    border
                    p-6
                "
            >
                <div className="flex items-center gap-3">

                    <AlertCircle
                        size={20}
                        className="text-red-400"
                    />

                    <h2 className="font-semibold text-red-400">
                        Unable to load profile
                    </h2>

                </div>

                <p className="profile-error-text mt-2 text-sm">
                    {error || "Something went wrong."}
                </p>

            </div>
        );
    }


    // ==========================================
    // Get Initials
    // ==========================================

    const getInitials = (name) => {
        if (!name) return "U";

        const parts = name.trim().split(/\s+/);

        if (parts.length === 1) {
            return parts[0]
                .charAt(0)
                .toUpperCase();
        }

        return (
            parts[0].charAt(0) +
            parts[parts.length - 1].charAt(0)
        ).toUpperCase();
    };


    return (
        <div
            className="
                profile-page
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

                <h1
                    className="
                        profile-title
                        text-2xl
                        font-bold
                        sm:text-3xl
                    "
                >
                    Profile
                </h1>

                <p
                    className="
                        profile-muted
                        mt-2
                        text-sm
                        sm:text-base
                    "
                >
                    Manage your account information and security.
                </p>

            </div>


            {/* ==========================================
                Success Message
            ========================================== */}

            {message && (
                <div
                    className="
                        profile-success
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        px-5
                        py-4
                    "
                >
                    <CheckCircle2
                        size={20}
                        className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <p className="profile-success-text text-sm">
                        {message}
                    </p>
                </div>
            )}


            {/* ==========================================
                Error Message
            ========================================== */}

            {error && (
                <div
                    className="
                        profile-error
                        flex
                        items-start
                        gap-3
                        rounded-2xl
                        border
                        px-5
                        py-4
                    "
                >
                    <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-400"
                    />

                    <p className="profile-error-text text-sm">
                        {error}
                    </p>
                </div>
            )}


            {/* ==========================================
                Profile Header
            ========================================== */}

            <section
                className="
                    profile-card
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                <div
                    className="
                        absolute
                        -right-20
                        -top-20
                        h-48
                        w-48
                        rounded-full
                        bg-blue-500/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-center
                    "
                >

                    {/* Avatar */}

                    <div
                        className="
                            profile-avatar
                            flex
                            h-20
                            w-20
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            text-2xl
                            font-bold
                            text-blue-400
                        "
                    >
                        {getInitials(profile.fullName)}
                    </div>


                    {/* User Information */}

                    <div className="min-w-0">

                        <h2
                            className="
                                profile-title
                                break-words
                                text-2xl
                                font-bold
                            "
                        >
                            {profile.fullName}
                        </h2>

                        <p
                            className="
                                profile-muted
                                mt-1
                                flex
                                items-start
                                gap-2
                                break-all
                                text-sm
                            "
                        >
                            <Mail
                                size={16}
                                className="mt-0.5 shrink-0"
                            />

                            {profile.email}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">

                            {profile.isVerified ? (
                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-emerald-500/20
                                        bg-emerald-500/10
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-emerald-400
                                    "
                                >
                                    <CheckCircle2 size={14} />
                                    Verified Account
                                </span>
                            ) : (
                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        border-amber-500/20
                                        bg-amber-500/10
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        text-amber-400
                                    "
                                >
                                    <AlertCircle size={14} />
                                    Email Not Verified
                                </span>
                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                Personal Information
            ========================================== */}

            <section
                className="
                    profile-card
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                <div className="mb-6">

                    <h2 className="profile-title text-xl font-bold">
                        Personal Information
                    </h2>

                    <p className="profile-muted mt-1 text-sm">
                        Update your basic account information.
                    </p>

                </div>


                <form
                    onSubmit={handleUpdateProfile}
                    className="space-y-6"
                >

                    {/* Full Name */}

                    <div>

                        <label className="profile-label mb-2 block text-sm font-medium">
                            Full Name
                        </label>

                        <div className="relative">

                            <User
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-500
                                "
                            />

                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                className="
                                    profile-input
                                    w-full
                                    rounded-xl
                                    border
                                    py-3.5
                                    pl-11
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                "
                                placeholder="Enter your full name"
                            />

                        </div>

                    </div>


                    {/* Email */}

                    <div>

                        <label className="profile-label mb-2 block text-sm font-medium">
                            Email Address
                        </label>

                        <div className="relative">

                            <Mail
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-500
                                "
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="
                                    profile-input
                                    w-full
                                    rounded-xl
                                    border
                                    py-3.5
                                    pl-11
                                    pr-4
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/10
                                "
                                placeholder="Enter your email"
                            />

                        </div>

                    </div>


                    {/* Save */}

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-blue-600
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-blue-500
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                sm:w-auto
                            "
                        >
                            <Save size={17} />

                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </section>


            {/* ==========================================
                Account Information
            ========================================== */}

            <section
                className="
                    profile-card
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                <div className="mb-6">

                    <h2 className="profile-title text-xl font-bold">
                        Account Information
                    </h2>

                    <p className="profile-muted mt-1 text-sm">
                        Information about your account.
                    </p>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                    "
                >

                    {/* Member Since */}

                    <div className="profile-sub-card rounded-2xl border p-5">

                        <div className="flex items-center gap-3">

                            <CalendarDays
                                size={20}
                                className="text-blue-400"
                            />

                            <div>

                                <p className="profile-caption text-xs">
                                    Member Since
                                </p>

                                <p className="profile-value mt-1 text-sm font-medium">
                                    {new Date(
                                        profile.createdAt
                                    ).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Account Status */}

                    <div className="profile-sub-card rounded-2xl border p-5">

                        <div className="flex items-center gap-3">

                            <ShieldCheck
                                size={20}
                                className={
                                    profile.isVerified
                                        ? "text-emerald-400"
                                        : "text-amber-400"
                                }
                            />

                            <div>

                                <p className="profile-caption text-xs">
                                    Account Status
                                </p>

                                <p className="profile-value mt-1 text-sm font-medium">
                                    {profile.isVerified
                                        ? "Verified"
                                        : "Active"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                Security
            ========================================== */}

            <section
                className="
                    profile-card
                    rounded-3xl
                    border
                    p-6
                    sm:p-8
                "
            >

                <div className="mb-6">

                    <div className="flex items-center gap-3">

                        <div className="profile-icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">

                            <Lock
                                size={20}
                                className="text-blue-400"
                            />

                        </div>

                        <div>

                            <h2 className="profile-title text-xl font-bold">
                                Security
                            </h2>

                            <p className="profile-muted mt-1 text-sm">
                                Keep your account secure.
                            </p>

                        </div>

                    </div>

                </div>


                <form
                    onSubmit={handleChangePassword}
                    className="space-y-5"
                >

                    {/* Current Password */}

                    <div>

                        <label className="profile-label mb-2 block text-sm font-medium">
                            Current Password
                        </label>

                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            className="
                                profile-input
                                w-full
                                rounded-xl
                                border
                                px-4
                                py-3.5
                                text-sm
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/10
                            "
                            placeholder="Enter current password"
                        />

                    </div>


                    {/* New Password */}

                    <div>

                        <label className="profile-label mb-2 block text-sm font-medium">
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                            className="
                                profile-input
                                w-full
                                rounded-xl
                                border
                                px-4
                                py-3.5
                                text-sm
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/10
                            "
                            placeholder="Enter new password"
                        />

                    </div>


                    {/* Confirm Password */}

                    <div>

                        <label className="profile-label mb-2 block text-sm font-medium">
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                            className="
                                profile-input
                                w-full
                                rounded-xl
                                border
                                px-4
                                py-3.5
                                text-sm
                                outline-none
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/10
                            "
                            placeholder="Confirm new password"
                        />

                    </div>


                    {/* Password Hint */}

                    <p className="profile-caption text-xs">
                        Your new password must contain at least 6 characters.
                    </p>


                    {/* Change Password */}

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={passwordSaving}
                            className="
                                profile-password-button
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                border
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                transition
                                active:scale-[0.99]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                sm:w-auto
                            "
                        >

                            <Lock size={17} />

                            {passwordSaving
                                ? "Changing..."
                                : "Change Password"}

                        </button>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Profile;