const db = require("../config/db");

const getResumeHistory = async (userId) => {

    const [rows] = await db.execute(
        `
        SELECT
            r.id,
            r.file_name,
            r.created_at,
            ra.ats_score,
            ra.grammar_score
        FROM resumes r
        JOIN resume_analysis ra
            ON r.id = ra.resume_id
        WHERE r.user_id = ?
        ORDER BY r.created_at DESC
        `,
        [userId]
    );
    

    return rows;
};

const getResumeReport = async (resumeId, userId) => {

    const [rows] = await db.execute(
        `
        SELECT
            r.file_name,
            r.file_url,
            r.created_at,
            ra.*
        FROM resumes r
        JOIN resume_analysis ra
            ON r.id = ra.resume_id
        WHERE r.id = ?
        AND r.user_id = ?
        `,
        [resumeId, userId]
    );

    
    return rows[0];
};


module.exports = {
    getResumeHistory,
    getResumeReport,
};