const db = require("../config/db");

const getAnswers = async (interviewId) => {

    const [rows] = await db.execute(
        `
        SELECT *
        FROM interview_answers
        WHERE interview_id = ?
        ORDER BY question_no
        `,
        [interviewId]
    );

    return rows;
};

const updateInterviewResult = async (

    interviewId,
    overallScore,
    overallFeedback

) => {

    await db.execute(

        `
        UPDATE interviews
        SET
            overall_score = ?,
            overall_feedback = ?,
            status = 'COMPLETED',
            completed_at = NOW()
        WHERE id = ?
        `,

        [
            overallScore,
            overallFeedback,
            interviewId
        ]

    );

};

module.exports = {

    getAnswers,

    updateInterviewResult,

};