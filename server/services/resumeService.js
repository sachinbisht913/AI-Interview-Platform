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
        console.log("========== RESUME UPLOAD START ==========");
        console.log("User ID:", userId);
        console.log("File:", file);

        await connection.beginTransaction();
        console.log("1. Transaction started");

        // 1. Extract PDF text
        console.log("2. Extracting PDF text...");
        const extractedText = await extractTextFromPDF(file.path);

        console.log(
            "PDF extracted successfully. Text length:",
            extractedText?.length
        );

        // 2. Gemini analysis
        console.log("3. Sending resume to Gemini...");

        const analysisText = await analyzeResume(extractedText);

        console.log("Gemini response received");

        const cleanAnalysis = analysisText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        console.log("4. Parsing Gemini JSON...");

        const analysis = JSON.parse(cleanAnalysis);

        console.log("Gemini JSON parsed successfully");

        // 3. Cloudinary
        console.log("5. Uploading PDF to Cloudinary...");

        const cloudinaryResponse = await uploadToCloudinary(file.path);

        console.log(
            "Cloudinary upload successful:",
            cloudinaryResponse.secure_url
        );

        // 4. Delete local file
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
            console.log("6. Local file deleted");
        }

        // 5. Save resume
        console.log("7. Saving resume to database...");

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

        console.log(
            "Resume saved. ID:",
            resumeResult.insertId
        );

        // 6. Save analysis
        console.log("8. Saving analysis to database...");

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

        console.log("Analysis saved successfully");

        // 7. Commit
        await connection.commit();

        console.log("9. Transaction committed");

        // 8. Notification
        try {
            console.log("10. Creating notification...");

            await createNotification({
                userId,
                type: "resume_analysis",
                title: "Resume Analysis Complete",
                message: "Your AI resume analysis is ready to view.",
                link: `/resume-report/${resumeResult.insertId}`,
            });

            console.log("Notification created successfully");

        } catch (notificationError) {
            console.error(
                "NOTIFICATION ERROR:",
                notificationError
            );

            // Don't fail resume upload because notification failed
        }

        console.log("========== RESUME UPLOAD SUCCESS ==========");

        return {
            resumeId: resumeResult.insertId,
            fileName: file.originalname,
            fileUrl: cloudinaryResponse.secure_url,
            analysis,
        };

    } catch (error) {

        console.error("========== RESUME UPLOAD ERROR ==========");
        console.error(error);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        try {
            await connection.rollback();
        } catch (rollbackError) {
            console.error("Rollback error:", rollbackError);
        }

        if (file && file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
            console.log("Local file deleted after error");
        }

        throw error;

    } finally {
        connection.release();
    }
};

module.exports = {
    uploadResumeService,
};