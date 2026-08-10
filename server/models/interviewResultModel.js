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

// ⭐ NEW
const updateAnswerEvaluation = async (
    answerId,
    score,
    feedback
) => {

    await db.execute(
        `
        UPDATE interview_answers
        SET
            score = ?,
            feedback = ?
        WHERE id = ?
        `,
        [
            score,
            feedback,
            answerId,
        ]
    );

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

    updateAnswerEvaluation,   

    updateInterviewResult,

};