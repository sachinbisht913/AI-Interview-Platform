// File: controllers/codingSubmissionController.js

const {
    getUserCodingSubmissions,
    getCodingSubmissionById,
} = require("../models/codingSubmissionModel");


// ========================================
// Get User Coding Submissions
// ========================================

const getMyCodingSubmissions = async (req, res) => {

    try {

        const userId =
            req.user.id;


        const submissions =
            await getUserCodingSubmissions(
                userId
            );


        return res.status(200).json({

            success: true,

            submissions,

        });

    } catch (error) {

        console.error(
            "Get Coding Submissions Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to get coding submissions.",

        });

    }

};


// ========================================
// Get Single Coding Submission
// ========================================

const getMyCodingSubmissionById = async (
    req,
    res
) => {

    try {

        const userId =
            req.user.id;

        const {
            id,
        } = req.params;


        const submission =
            await getCodingSubmissionById(
                id,
                userId
            );


        if (!submission) {

            return res.status(404).json({

                success: false,

                message:
                    "Coding submission not found.",

            });

        }


        return res.status(200).json({

            success: true,

            submission,

        });

    } catch (error) {

        console.error(
            "Get Coding Submission Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to get coding submission.",

        });

    }

};


module.exports = {

    getMyCodingSubmissions,

    getMyCodingSubmissionById,

};