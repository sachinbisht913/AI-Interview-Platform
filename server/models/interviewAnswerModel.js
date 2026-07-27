const db = require("../config/db");

const saveAnswer = async (

    interviewId,
    questionNo,
    topic,
    question,
    expectedAnswer,
    userAnswer

) => {

    const [result] = await db.execute(

        `
        INSERT INTO interview_answers
        (
            interview_id,
            question_no,
            topic,
            question,
            expected_answer,
            user_answer
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
        `,

        [

            interviewId,
            questionNo,
            topic,
            question,
            expectedAnswer,
            userAnswer

        ]

    );

    return result.insertId;

};

module.exports = {

    saveAnswer,

};