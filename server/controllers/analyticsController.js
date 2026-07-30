const {
    analyticsService,
} = require("../services/analyticsService");

const getAnalytics = async (req, res) => {

    try {

        const result = await analyticsService(req);

        return res.status(200).json(result);

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {
    getAnalytics,
};