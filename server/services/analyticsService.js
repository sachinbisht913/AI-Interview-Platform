const {

    getSummary,

    getScoreHistory,

    getDomainPerformance,

    getRecentInterviews

} = require("../models/analyticsModel");

const analyticsService = async (req) => {

    const userId = req.user.id;

    const summary = await getSummary(userId);

    const history = await getScoreHistory(userId);

    const domains = await getDomainPerformance(userId);

    const recent = await getRecentInterviews(userId);

    return {

        success:true,

        analytics:{

            ...summary,

            history,

            domains,

            recent

        }

    };

};

module.exports={

analyticsService

};