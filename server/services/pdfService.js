const fs = require("fs");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {

    try {

        // Read PDF file
        const pdfBuffer = fs.readFileSync(filePath);

        // Extract text
        const data = await pdf(pdfBuffer);

        return data.text;

    } catch (error) {

        throw error;

    }

};

module.exports = {
    extractTextFromPDF,
};