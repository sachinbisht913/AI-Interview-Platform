const db = require("../config/db");

const createInterview = async (
    userId,
    domain,
    difficulty,
    totalQuestions
) => {

 

    const [result] = await db.execute(
        `
        INSERT INTO interviews
        (
            user_id,
            domain,
            difficulty,
            total_questions
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            userId,
            domain,
            difficulty,
            totalQuestions
        ]
    );

   

    return result.insertId;
};

module.exports = {
    createInterview,
};