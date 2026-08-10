const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});


const sendPasswordResetEmail = async (
    email,
    resetLink
) => {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: email,

        subject: "Reset Your AI Interview Platform Password",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                background: #0f172a;
                color: #ffffff;
            ">

                <h2>
                    Password Reset Request
                </h2>

                <p style="color:#cbd5e1;">
                    We received a request to reset your password.
                </p>

                <p style="color:#cbd5e1;">
                    Click the button below to create a new password.
                </p>

                <a
                    href="${resetLink}"
                    style="
                        display:inline-block;
                        margin-top:20px;
                        padding:12px 20px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:8px;
                    "
                >
                    Reset Password
                </a>

                <p style="
                    margin-top:25px;
                    color:#94a3b8;
                    font-size:14px;
                ">
                    This link will expire in 15 minutes.
                </p>

                <p style="
                    color:#64748b;
                    font-size:13px;
                ">
                    If you did not request a password reset,
                    you can safely ignore this email.
                </p>

            </div>
        `,
    });

};


module.exports = {
    sendPasswordResetEmail,
};