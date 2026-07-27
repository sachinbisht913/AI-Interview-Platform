const {
    startInterviewService,
    submitAnswerService,
} = require("../services/interviewService");

const startInterview = async (req, res) => {

    try {

        const result = await startInterviewService(req);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const submitAnswer = async (req, res) => {

    try {

        const result = await submitAnswerService(req);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    startInterview,
    submitAnswer,
};