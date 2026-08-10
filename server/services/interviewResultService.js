const {
  getAnswers,
  updateAnswerEvaluation,
  updateInterviewResult,
} = require("../models/interviewResultModel");
const {
  createNotification,
} = require("../utils/notificationService");

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

    // ===========================
    // Save Question Evaluation
    // ===========================
    await updateAnswerEvaluation(
      answer.id,
      evaluation.score,
      evaluation.feedback
    );

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

  // ===========================
  // Category Scores
  // ===========================

  const technicalScore = overallScore;

  const communicationScore = Math.min(
    10,
    overallScore + 1
  );

  const confidenceScore = Math.max(
    1,
    overallScore - 1
  );

  const problemSolvingScore = Math.max(
    1,
    overallScore
  );

  // ===========================
  // AI Summary
  // ===========================

  let summary = "";

  if (overallScore >= 9) {

    summary =
      "Outstanding interview performance. You demonstrated excellent technical knowledge, confident communication, and strong problem-solving skills.";

  } else if (overallScore >= 7) {

    summary =
      "Good interview performance. You have a solid understanding of the concepts, but improving weak areas will make you more interview-ready.";

  } else {

    summary =
      "Your interview showed potential, but several concepts need additional practice. Focus on the recommended learning path and continue taking mock interviews.";

  }

  await updateInterviewResult(
    interviewId,
    overallScore,
    overallFeedback
  );

  await createNotification({
    userId: req.user.id,
    type: "interview_result",
    title: "Interview Evaluation Ready",
    message:
        "Your AI interview evaluation is ready to view.",
    link: `/interview-report/${interviewId}`,
});

  return {
    success: true,

    overallScore,

    technicalScore,

    communicationScore,

    confidenceScore,

    problemSolvingScore,

    summary,

    overallFeedback,

    results,

    strengths,

    weaknesses,

    recommendedTopics,
  };
};

module.exports = {
  evaluateInterviewService,
};