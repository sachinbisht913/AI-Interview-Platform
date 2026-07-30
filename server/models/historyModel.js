const db = require("../config/db");

const getInterviewHistory = async (userId) => {

    const [rows] = await db.execute(

        `
        SELECT
            id,
            domain,
            difficulty,
            total_questions,
            overall_score,
            created_at
        FROM interviews
        WHERE user_id = ?
        ORDER BY created_at DESC
        `,

        [userId]

    );

    return rows;

};

const getInterviewReport = async (interviewId, userId) => {

    const [rows] = await db.execute(

        `
        SELECT
            ia.id,
            ia.question_no,
            ia.topic,
            ia.question,
            ia.expected_answer,
            ia.user_answer,
            ia.score,
            ia.feedback,
            i.domain,
            i.difficulty,
            i.overall_score,
            i.overall_feedback
        FROM interview_answers ia
        JOIN interviews i
            ON ia.interview_id = i.id
        WHERE ia.interview_id = ?
        AND i.user_id = ?
        ORDER BY ia.question_no
        `,

        [interviewId, userId]

    );

    return rows;

};

module.exports = {
    getInterviewHistory,
    getInterviewReport
};