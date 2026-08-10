const db = require("../config/db");
const fs = require("fs");
const {
    createNotification,
} = require("../utils/notificationService");
const { uploadToCloudinary } = require("./cloudinaryService");
const { extractTextFromPDF } = require("./pdfService");
const { analyzeResume } = require("./geminiService");

const uploadResumeService = async (file, userId) => {

    const connection = await db.getConnection();

    try {

        // Start Transaction
        await connection.beginTransaction();

        // 1. Extract Text
        const extractedText = await extractTextFromPDF(file.path);

        // 2. Analyze Resume using Gemini
        const analysisText = await analyzeResume(extractedText);

        // Remove ```json ``` if Gemini returns markdown
        const cleanAnalysis = analysisText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const analysis = JSON.parse(cleanAnalysis);

        // 3. Upload PDF to Cloudinary
        const cloudinaryResponse = await uploadToCloudinary(file.path);

        // 4. Delete Local File
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // 5. Save Resume
        const [resumeResult] = await connection.query(
            `INSERT INTO resumes
            (user_id, file_name, file_url, extracted_text)
            VALUES (?, ?, ?, ?)`,
            [
                userId,
                file.originalname,
                cloudinaryResponse.secure_url,
                extractedText,
            ]
        );

        // 6. Save AI Analysis
        await connection.query(
            `INSERT INTO resume_analysis
            (
                resume_id,
                ats_score,
                grammar_score,
                strengths,
                weaknesses,
                missing_skills,
                project_suggestions,
                interview_questions,
                learning_path
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                resumeResult.insertId,
                analysis.atsScore,
                analysis.grammarScore,
                JSON.stringify(analysis.strengths),
                JSON.stringify(analysis.weaknesses),
                JSON.stringify(analysis.missingSkills),
                JSON.stringify(analysis.projectSuggestions),
                JSON.stringify(analysis.interviewQuestions),
                JSON.stringify(analysis.recommendedLearningPath),
            ]
        );

        // 7. Commit Transaction
        await connection.commit();

        await createNotification({
            userId,
            type: "resume_analysis",
            title: "Resume Analysis Complete",
            message:
                "Your AI resume analysis is ready to view.",
            link: `/resume-report/${resumeResult.insertId}`,
        });

        return {
            resumeId: resumeResult.insertId,
            fileName: file.originalname,
            fileUrl: cloudinaryResponse.secure_url,
            analysis,
        };

    } catch (error) {

        // Rollback Transaction
        await connection.rollback();

        // Delete Local File if it still exists
        if (file && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        throw error;

    } finally {

        connection.release();

    }
};

module.exports = {
    uploadResumeService,
};