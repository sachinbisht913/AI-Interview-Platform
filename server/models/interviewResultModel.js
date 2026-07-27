const db = require("../config/db");

const getAnswers = async (interviewId) => {

    const [rows] = await db.execute(

        `
        SELECT *
        FROM interview_answers
        WHERE interview_id=?
        ORDER BY question_no
        `,

        [interviewId]

    );

    return rows;

};

module.exports = {
    getAnswers,
};