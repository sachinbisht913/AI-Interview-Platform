const {

  getAnswers,

  updateInterviewResult,

} = require("../models/interviewResultModel");

const { evaluateAnswer } = require("./interviewEvaluationService");

const evaluateInterviewService = async (req) => {
  const { interviewId } = req.body;

  const answers = await getAnswers(interviewId);

  const results = [];

  for (const answer of answers) {
    const ai = await evaluateAnswer(
      answer.question,

      answer.expected_answer,

      answer.user_answer
    );

    const evaluation = JSON.parse(ai);

    results.push({
      ...answer,

      evaluation,
    });
  }

  const strengths = [];

  const weaknesses = [];

  const recommendedTopics = [];

  results.forEach((item) => {
    strengths.push(...item.evaluation.strengths);

    weaknesses.push(...item.evaluation.weaknesses);

    recommendedTopics.push(...item.evaluation.recommendedTopics);
  });

  const totalScore = results.reduce(

    (sum, item) => sum + Number(item.evaluation.score),

    0

);

const overallScore = Math.round(

    totalScore / results.length

);

const overallFeedback =

    `Overall interview score: ${overallScore}/10`;
    await updateInterviewResult(

      interviewId,
  
      overallScore,
  
      overallFeedback
  
  );

  return {

    success: true,

    overallScore,

    overallFeedback,

    results,

    strengths,

    weaknesses,

    recommendedTopics

};
};

module.exports = {
  evaluateInterviewService,
};
