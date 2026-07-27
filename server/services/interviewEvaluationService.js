const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const evaluateAnswer = async (

    question,
    expectedAnswer,
    userAnswer

) => {

    const prompt = `
You are an expert interviewer.

Question:
${question}

Expected Answer:
${expectedAnswer}

Candidate Answer:
${userAnswer}

Return ONLY JSON.

{
"score":0,
"feedback":""
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
    evaluateAnswer,
};