const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewQuestions = async (
    domain,
    difficulty,
    totalQuestions
) => {

    const prompt = `
You are an expert technical interviewer.

Generate ${totalQuestions} interview questions.

Domain: ${domain}

Difficulty: ${difficulty}

Return ONLY valid JSON.

{
  "questions": [
    {
      "id": 1,
      "topic": "",
      "question": "",
      "expectedAnswer": ""
    }
  ]
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
    });

    return response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};

module.exports = {
    generateInterviewQuestions,
};