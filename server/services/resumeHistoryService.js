const {
    getResumeHistory,
    getResumeReport,
} = require("../models/resumeHistoryModel");

const resumeHistoryService = async (req) => {

    const resumes = await getResumeHistory(req.user.id);
   

    return {
        success: true,
        resumes,
    };

};

const resumeReportService = async (req) => {

    const report = await getResumeReport(
        req.params.id,
        req.user.id
    );

    return {
        success: true,
        report,
    };

};

module.exports = {
    resumeHistoryService,
    resumeReportService,
};