const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (filePath) => {
    try {

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "raw",
            folder: "AI-Interview-Platform/Resumes",
        });

        // Delete local file
        // fs.unlinkSync(filePath);

        return result;

    } catch (error) {

        // Delete file even if upload fails
        // if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        // }

        throw error;
    }
};

module.exports = {
    uploadToCloudinary,
};