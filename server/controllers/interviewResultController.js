const {

    evaluateInterviewService,

} = require("../services/interviewResultService");

const evaluateInterview = async (req, res) => {

    try {

        const result = await evaluateInterviewService(req);

        res.json(result);

    }

    catch (error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports={

evaluateInterview

};

