const {
    historyService,
    reportService,
} = require("../services/historyService");

const getHistory = async (req, res) => {

    try {

        const result = await historyService(req);

        return res.json(result);

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
const report = async (req, res) => {

    try {

        const result = await reportService(req);

        return res.json(result);

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getHistory,
    report

};