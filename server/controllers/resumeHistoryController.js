const  {
    resumeHistoryService,
    resumeReportService,
} = require('../services/resumeHistoryService');

const getResumeHistory = async (req, res)=>{
    try{
        const result = await resumeHistoryService(req);
        return res.json(result);
    }catch(error){
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
};

const getResumeReport = async (req, res) => {
    try{
        const result = await resumeReportService(req);
        return res.json(result);
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


module.exports = {
    getResumeHistory,
    getResumeReport,
};