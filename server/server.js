// Core Packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Local Modules
const db = require("./config/db");
const app = express();
const verifyToken = require("./middleware/authMiddleware");

//routes
const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const historyRoutes = require("./routes/historyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const resumeHistoryRoutes = require("./routes/resumeHistoryRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const codingProblemRoutes =
    require("./routes/codingProblemRoutes");
const codingRoutes = require("./routes/codingRoutes");
const codingSubmissionRoutes =
    require("./routes/codingSubmissionRoutes");

// Middleware
app.use(
  cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resume-history", resumeHistoryRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(
  "/api/coding-problems",
  codingProblemRoutes
);
app.use(
  "/api/coding",
  codingRoutes
);

app.use(
  "/api/coding-submissions",
  codingSubmissionRoutes
);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Interview Platform API is running 🚀",
  });
});
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "welocome to dashboard 🚀",
  });
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {

        const connection = await db.getConnection();

        console.log("✅ MySQL Connected Successfully");

        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
          console.log(`🚀 Server running on port ${PORT}`);
      });

    } catch (error) {

        console.log("❌ Database Connection Failed");
        console.log(error.message);

    }
};

startServer();