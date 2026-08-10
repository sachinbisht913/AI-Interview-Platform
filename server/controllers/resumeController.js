const { uploadResumeService } = require("../services/resumeService");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF",
            });
        }

        
        const userId = req.user.id;
        const resume = await uploadResumeService(
            req.file,
            userId
        );

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            data: resume,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    uploadResume,
};