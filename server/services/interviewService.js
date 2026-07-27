const {
    generateInterviewQuestions,
} = require("./interviewGeminiService");

const {
    createInterview,
} = require("../models/interviewModel");
const {
    saveAnswer,
} = require("../models/interviewAnswerModel");

const startInterviewService = async (req) => {

    const {
        domain,
        difficulty,
        totalQuestions,
    } = req.body;

    const userId = req.user.id;

    const interviewId = await createInterview(
        userId,
        domain,
        difficulty,
        totalQuestions
    );

    const interview = await generateInterviewQuestions(
        domain,
        difficulty,
        totalQuestions
    );

    return {
        success: true,
        interviewId,
        interview: JSON.parse(interview),
    };

};

const submitAnswerService = async (req) => {

    const {

        interviewId,
        questionNo,
        topic,
        question,
        expectedAnswer,
        userAnswer,

    } = req.body;

    await saveAnswer(

        interviewId,
        questionNo,
        topic,
        question,
        expectedAnswer,
        userAnswer

    );

    return {

        success: true,
        message: "Answer Saved"

    };

};

module.exports = {
    startInterviewService,
    submitAnswerService,
};