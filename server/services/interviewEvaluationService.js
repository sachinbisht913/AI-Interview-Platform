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
    You are an expert senior technical interviewer.
    
    Evaluate the candidate answer.
    
    Question:
    ${question}
    
    Expected Answer:
    ${expectedAnswer}
    
    Candidate Answer:
    ${userAnswer}
    
    Return ONLY valid JSON.
    
    {
      "score": 8,
      "feedback": "Short paragraph explaining the answer quality.",
      "strengths": [
        "..."
      ],
      "weaknesses": [
        "..."
      ],
      "recommendedTopics": [
        "..."
      ]
    }
    
    Do not return markdown.
    Do not return explanation.
    Only JSON.
    `;

    // const response = await ai.models.generateContent({

    //     model: "gemini-flash-latest",

    //     contents: prompt,

    // });

    // return response.text
    //     .replace(/```json/g, "")
    //     .replace(/```/g, "")
    //     .trim();
    return JSON.stringify({
        score: 8,
        feedback: "Good answer. You explained the main concept correctly.",
        strengths: [
            "Correct understanding",
            "Used an example"
        ],
        weaknesses: [
            "Could include more details"
        ],
        recommendedTopics: [
            "React Hooks",
            "useEffect Cleanup"
        ]
    });

};

module.exports = {
    evaluateAnswer,
};