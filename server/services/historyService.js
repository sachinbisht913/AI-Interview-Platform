const {
    getInterviewHistory,
    getInterviewReport
} = require("../models/historyModel");

const historyService = async (req) => {

    const interviews = await getInterviewHistory(req.user.id);

    return {
        success: true,
        interviews,
    };

};

const reportService = async (req) => {

    const report = await getInterviewReport(

        req.params.id,

        req.user.id

    );

    return {

        success: true,

        report

    };

};

module.exports = {

    historyService,

    reportService

};