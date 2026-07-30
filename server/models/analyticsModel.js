const db = require("../config/db");

const getSummary = async (userId) => {

    const [rows] = await db.execute(

        `
        SELECT

            COUNT(*) AS totalInterviews,

            ROUND(AVG(overall_score),0) AS averageScore,

            MAX(overall_score) AS bestScore

        FROM interviews

        WHERE user_id=?
        AND status='COMPLETED'
        `,

        [userId]

    );

    return rows[0];

};

const getScoreHistory = async (userId) => {

    const [rows] = await db.execute(

        `
        SELECT

            id,

            overall_score

        FROM interviews

        WHERE user_id=?

        AND status='COMPLETED'

        ORDER BY created_at ASC
        `,

        [userId]

    );

    return rows;

};

const getDomainPerformance = async (userId) => {

    const [rows] = await db.execute(

        `
        SELECT

            domain,

            ROUND(AVG(overall_score),0) score

        FROM interviews

        WHERE user_id=?

        AND status='COMPLETED'

        GROUP BY domain
        `,

        [userId]

    );

    return rows;

};

const getRecentInterviews = async (userId) => {

    const [rows] = await db.execute(

        `
        SELECT

            domain,

            overall_score,

            created_at

        FROM interviews

        WHERE user_id=?

        AND status='COMPLETED'

        ORDER BY created_at DESC

        LIMIT 5
        `,

        [userId]

    );

    return rows;

};

module.exports = {

    getSummary,

    getScoreHistory,

    getDomainPerformance,

    getRecentInterviews

};