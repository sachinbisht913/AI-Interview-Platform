const ai = require("../config/gemini");

const analyzeResume = async (resumeText) => {

    const prompt = `
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

{
  "atsScore": number,
  "grammarScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "projectSuggestions": [],
  "interviewQuestions": [],
  "recommendedLearningPath": []
}

Resume:

${resumeText}
`;

    try {

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: prompt,
        });

        return response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

    } catch (error) {

        console.error(error);

        throw error;

    }

};

module.exports = {
    analyzeResume,
};