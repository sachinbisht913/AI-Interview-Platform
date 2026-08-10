const db = require("../config/db");
const bcrypt = require("bcrypt");

// ==========================================
// GET PROFILE
// ==========================================

const getProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const [rows] = await db.query(
            `
            SELECT
                id,
                full_name,
                email,
                is_verified,
                created_at
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        const user = rows[0];

        return res.status(200).json({

            success: true,

            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                isVerified: Boolean(user.is_verified),
                createdAt: user.created_at,
            },

        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });

    }

};


// ==========================================
// UPDATE PROFILE
// ==========================================

const updateProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const { fullName, email } = req.body;

        if (!fullName || !email) {

            return res.status(400).json({
                success: false,
                message: "Full name and email are required",
            });

        }

        // Check whether email belongs to another user

        const [existingUser] = await db.query(
            `
            SELECT id
            FROM users
            WHERE email = ?
            AND id != ?
            `,
            [email, userId]
        );

        if (existingUser.length > 0) {

            return res.status(400).json({
                success: false,
                message: "Email is already being used by another account",
            });

        }

        await db.query(
            `
            UPDATE users
            SET
                full_name = ?,
                email = ?
            WHERE id = ?
            `,
            [
                fullName,
                email,
                userId,
            ]
        );

        return res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: {
                id: userId,
                fullName,
                email,
            },

        });

    } catch (error) {

        console.error("Update Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });

    }

};


// ==========================================
// CHANGE PASSWORD
// ==========================================

const changePassword = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            currentPassword,
            newPassword,
        } = req.body;

        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });

        }

        if (newPassword.length < 6) {

            return res.status(400).json({
                success: false,
                message: "New password must contain at least 6 characters",
            });

        }

        const [rows] = await db.query(
            `
            SELECT password
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        const isPasswordMatch = await bcrypt.compare(
            currentPassword,
            rows[0].password
        );

        if (!isPasswordMatch) {

            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });

        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await db.query(
            `
            UPDATE users
            SET password = ?
            WHERE id = ?
            `,
            [
                hashedPassword,
                userId,
            ]
        );

        return res.status(200).json({

            success: true,

            message: "Password changed successfully",

        });

    } catch (error) {

        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to change password",
        });

    }

};


module.exports = {
    getProfile,
    updateProfile,
    changePassword,
};