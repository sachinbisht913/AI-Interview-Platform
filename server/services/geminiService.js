const ai = require("../config/gemini");

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

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

    const maxRetries = 3;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            console.log(
                `Gemini request attempt ${attempt + 1}/${maxRetries + 1}`
            );

            const response = await ai.models.generateContent({
                model: "gemini-flash-latest",
                contents: prompt,
            });

            console.log("Gemini request successful");

            return response.text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

        } catch (error) {

            console.error(
                `Gemini request failed on attempt ${attempt + 1}:`,
                error.message
            );

            // Get status/code from Gemini error
            const status = error.status || error.code;

            const isTemporaryError =
                status === 503 ||
                status === 429 ||
                status === 500;

            // If it's not a temporary error,
            // don't retry.
            if (!isTemporaryError) {
                throw error;
            }

            // If we've used all retries, throw the error.
            if (attempt === maxRetries) {
                console.error(
                    "Gemini failed after all retry attempts."
                );

                throw error;
            }

            // Wait before trying again
            const delay = Math.pow(2, attempt) * 2000;

            console.log(
                `Gemini temporarily unavailable. Retrying in ${
                    delay / 1000
                } seconds...`
            );

            await sleep(delay);
        }
    }
};

module.exports = {
    analyzeResume,
};