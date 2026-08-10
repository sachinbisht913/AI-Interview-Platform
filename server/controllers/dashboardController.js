const db = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // ===========================
    // User
    // ===========================

    const [users] = await db.query(
      `SELECT full_name
             FROM users
             WHERE id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ===========================
    // Total Interviews
    // ===========================

    const [interviewCount] = await db.query(
      `SELECT COUNT(*) AS totalInterviews
             FROM interviews
             WHERE user_id = ?`,
      [userId]
    );

    // ===========================
    // Average Interview Score
    // ===========================

    const [averageScore] = await db.query(
      `SELECT ROUND(AVG(overall_score)) AS averageScore
             FROM interviews
             WHERE user_id = ?
             AND status = 'COMPLETED'`,
      [userId]
    );

    // ===========================
    // Latest ATS Score
    // ===========================

    const [atsScore] = await db.query(
      `SELECT ra.ats_score
             FROM resume_analysis ra
             INNER JOIN resumes r
             ON ra.resume_id = r.id
             WHERE r.user_id = ?
             ORDER BY ra.created_at DESC
             LIMIT 1`,
      [userId]
    );

    // ===========================
    // Resume Count (Temporary)
    // Later this will become Coding Solved
    // ===========================

    const [resumeCount] = await db.query(
      `SELECT COUNT(*) AS resumeCount
             FROM resumes
             WHERE user_id = ?`,
      [userId]
    );

    // ===========================
    // Performance Chart
    // ===========================

    const [performanceData] = await db.query(
      `
    SELECT
        completed_at,
        overall_score
    FROM interviews
    WHERE user_id = ?
    AND status = 'COMPLETED'
    ORDER BY completed_at DESC
    LIMIT 7
    `,
      [userId]
    );

    const performance = performanceData.reverse().map((item) => ({
      day: new Date(item.completed_at).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      score: item.overall_score,
    }));

    // ===========================
    // Recent Interviews
    // ===========================

    const [recentInterviewData] = await db.query(
      `
    SELECT
        id,
        domain,
        difficulty,
        overall_score,
        status,
        completed_at
    FROM interviews
    WHERE user_id = ?
    AND status = 'COMPLETED'
    ORDER BY completed_at DESC
    LIMIT 5
    `,
      [userId]
    );

    const recentInterviews = recentInterviewData.map((item) => ({
      id: item.id,
      title: item.domain,
      category: item.difficulty,
      score: item.overall_score,
      status: item.status,
      completedAt: item.completed_at,
    }));

    // ===========================
    // Helper
    // ===========================

    const parseField = (value) => {
      if (!value) return [];

      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    };

    // ===========================
    // AI Recommendations
    // ===========================

    const [recommendationData] = await db.query(
      `
    SELECT
        ra.missing_skills,
        ra.weaknesses,
        ra.learning_path
    FROM resume_analysis ra
    INNER JOIN resumes r
        ON ra.resume_id = r.id
    WHERE r.user_id = ?
    ORDER BY ra.created_at DESC
    LIMIT 1
    `,
      [userId]
    );

    let recommendations = [];

    if (recommendationData.length > 0) {
      const row = recommendationData[0];

      try {
        const missingSkills = parseField(row.missing_skills);

        const weaknesses = parseField(row.weaknesses);

        const learningPath = parseField(row.learning_path);

        recommendations = [
          ...missingSkills.map((item) => ({
            type: "Missing Skill",
            text: item,
          })),

          ...weaknesses.map((item) => ({
            type: "Weakness",
            text: item,
          })),

          ...learningPath.map((item) => ({
            type: "Learning Path",
            text: item,
          })),
        ];
      } catch (error) {
        console.error("Recommendation Parsing Error:", error);
        recommendations = [];
      }
    }

    const dashboard = {
      user: {
        fullName: users[0].full_name,
      },

      summary: {
        progress: 84,
        progressChange: 12,
        streak: 7,
      },

      stats: {
        totalInterviews: interviewCount[0].totalInterviews || 0,

        averageScore: averageScore[0].averageScore || 0,

        atsScore: atsScore.length > 0 ? atsScore[0].ats_score : 0,

        codingSolved: resumeCount[0].resumeCount || 0,
      },

      performance,

      recentInterviews,

      recommendations,
    };

    return res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
    });
  }
};

module.exports = {
  getDashboard,
};
