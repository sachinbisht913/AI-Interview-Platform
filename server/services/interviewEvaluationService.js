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

Evaluate the candidate's answer objectively.

Question:
${question}

Expected Answer:
${expectedAnswer}

Candidate Answer:
${userAnswer}

Evaluate the candidate based on:

1. Technical correctness
2. Completeness
3. Understanding of the concept
4. Relevance to the question
5. Quality of explanation

Scoring rules:
- Score must be an integer from 0 to 10.
- 10 = Excellent, accurate, complete and well-explained answer.
- 8-9 = Very good answer with only minor gaps.
- 6-7 = Good/basic understanding but some important details are missing.
- 4-5 = Partial understanding with significant gaps or mistakes.
- 2-3 = Very limited understanding.
- 0-1 = Incorrect, irrelevant, or no meaningful answer.

Do not give a high score simply because the answer contains keywords.
Compare the candidate answer with the expected answer carefully.

Return ONLY valid JSON in exactly this structure:

{
  "score": 0,
  "feedback": "Short paragraph explaining the quality of the answer.",
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
Do not return code fences.
Do not return any explanation outside the JSON.
`;

  const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
  });

  const result = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  // Validate that Gemini returned valid JSON
  const evaluation = JSON.parse(result);

  // Keep score safely between 0 and 10
  evaluation.score = Math.max(
      0,
      Math.min(10, Number(evaluation.score))
  );

  return JSON.stringify(evaluation);
};

module.exports = {
    evaluateAnswer,
};