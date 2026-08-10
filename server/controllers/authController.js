const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const crypto = require("crypto");

const {
    sendPasswordResetEmail,
} = require("../services/emailService");

const signup = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //hash
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const [result] = await db.query(
            `INSERT INTO users (full_name, email, password)
             VALUES (?, ?, ?)`,
            [fullName, email, hashedPassword]
        );


        return res.status(201).json({
            success:true,
            message: "user created successfully",
            data: {
                id: result.insertId,
                fullName,
                email,
                
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const login = async (req, res)=>{
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
               success: false,
               message: "Email and password are required",
            })
        }
        const [rows] = await db.query(
            `SELECT * FROM users WHERE email = ?`,

            [email]
        );

        if(rows.length === 0){
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }

        const user = rows[0];

       const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
        )

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                
            },
        });

        


    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }

}

const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required",
            });

        }

        const [rows] = await db.query(
            `
            SELECT id, email
            FROM users
            WHERE email = ?
            `,
            [email]
        );

        /*
         * For security, don't reveal whether
         * an account exists.
         */

        if (rows.length === 0) {

            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });

        }

        const user = rows[0];

        // Generate random token

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        // Hash token before storing

        const tokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Token expires after 15 minutes

        const expiresAt = new Date(
            Date.now() + 15 * 60 * 1000
        );

        // Remove previous unused tokens

        await db.query(
            `
            DELETE FROM password_reset_tokens
            WHERE user_id = ?
            `,
            [user.id]
        );

        // Store hashed token

        await db.query(
            `
            INSERT INTO password_reset_tokens
            (
                user_id,
                token_hash,
                expires_at
            )
            VALUES (?, ?, ?)
            `,
            [
                user.id,
                tokenHash,
                expiresAt,
            ]
        );

        const resetLink =
            `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendPasswordResetEmail(
            user.email,
            resetLink
        );

        return res.status(200).json({

            success: true,

            message:
                "If an account exists with this email, a password reset link has been sent.",

        });

    } catch (error) {

        console.error(
            "Forgot Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to process password reset request.",
        });

    }

};

const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        if (!token || !password) {

            return res.status(400).json({
                success: false,
                message:
                    "Token and password are required",
            });

        }

        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 6 characters",
            });

        }

        // Hash received token

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const [rows] = await db.query(
            `
            SELECT *
            FROM password_reset_tokens
            WHERE token_hash = ?
            AND used_at IS NULL
            AND expires_at > NOW()
            LIMIT 1
            `,
            [tokenHash]
        );

        if (rows.length === 0) {

            return res.status(400).json({
                success: false,
                message:
                    "Reset link is invalid or has expired.",
            });

        }

        const resetRecord = rows[0];

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await db.query(
            `
            UPDATE users
            SET password = ?
            WHERE id = ?
            `,
            [
                hashedPassword,
                resetRecord.user_id,
            ]
        );

        // Invalidate token

        await db.query(
            `
            UPDATE password_reset_tokens
            SET used_at = NOW()
            WHERE id = ?
            `,
            [resetRecord.id]
        );

        return res.status(200).json({

            success: true,

            message:
                "Password reset successfully. You can now login.",

        });

    } catch (error) {

        console.error(
            "Reset Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to reset password.",
        });

    }

};
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            currentPassword,
            newPassword,
        } = req.body;

        // Check fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required.",
            });
        }

        // Basic password validation
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 6 characters.",
            });
        }

        // Get current user's password
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
                message: "User not found.",
            });
        }

        const user = rows[0];

        // Verify current password
        const isPasswordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect.",
            });
        }

        // Prevent same password
        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message:
                    "New password must be different from your current password.",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Update password
        await db.query(
            `
            UPDATE users
            SET password = ?
            WHERE id = ?
            `,
            [hashedPassword, userId]
        );

        return res.status(200).json({
            success: true,
            message: "Password changed successfully.",
        });

    } catch (error) {
        console.error("Change Password Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to change password.",
        });
    }
};
const deleteAccount = async (req, res) => {
    const connection = await db.getConnection();

    try {
        const userId = req.user.id;
        const { password } = req.body;

        // Password is required
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required to delete your account.",
            });
        }

        // Get user's password
        const [users] = await connection.query(
            `
            SELECT password
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Verify password
        const isPasswordMatch = await bcrypt.compare(
            password,
            users[0].password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        // Start transaction
        await connection.beginTransaction();

        // 1. Delete password reset tokens
        await connection.query(
            `
            DELETE FROM password_reset_tokens
            WHERE user_id = ?
            `,
            [userId]
        );

        // 2. Delete interview answers
        await connection.query(
            `
            DELETE FROM interview_answers
            WHERE interview_id IN (
                SELECT id
                FROM interviews
                WHERE user_id = ?
            )
            `,
            [userId]
        );

        // 3. Delete interviews
        await connection.query(
            `
            DELETE FROM interviews
            WHERE user_id = ?
            `,
            [userId]
        );

        // 4. Delete resume analysis
        await connection.query(
            `
            DELETE FROM resume_analysis
            WHERE resume_id IN (
                SELECT id
                FROM resumes
                WHERE user_id = ?
            )
            `,
            [userId]
        );

        // 5. Delete resumes
        await connection.query(
            `
            DELETE FROM resumes
            WHERE user_id = ?
            `,
            [userId]
        );

        // 6. Delete user
        await connection.query(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [userId]
        );

        // Commit everything
        await connection.commit();

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully.",
        });

    } catch (error) {

        await connection.rollback();

        console.error(
            "Delete Account Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete account.",
        });

    } finally {

        connection.release();

    }
};

module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    deleteAccount,
};