const {

    getAnswers,

} = require("../models/interviewResultModel");

const {

    evaluateAnswer,

} = require("./interviewEvaluationService");

const evaluateInterviewService = async (req) => {

    const { interviewId } = req.body;

    const answers = await getAnswers(interviewId);

    const results = [];

    for (const answer of answers) {

        const ai = await evaluateAnswer(

            answer.question,

            answer.expected_answer,

            answer.user_answer

        );

        results.push({

            ...answer,

            evaluation: JSON.parse(ai),

        });

    }

    return {

        success:true,

        results,

    };

};

module.exports={

evaluateInterviewService

};