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

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/resume", resumeRoutes);


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

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {

        console.log("❌ Database Connection Failed");
        console.log(error.message);

    }
};

startServer();