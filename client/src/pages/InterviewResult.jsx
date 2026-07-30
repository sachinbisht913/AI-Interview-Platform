import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ActionButtons from "../components/interview/ActionButtons";

import OverallScore from "../components/interview/OverallScore";
import QuestionFeedback from "../components/interview/QuestionFeedback";
import EvaluationLoader from "../components/interview/EvaluationLoader";
import StrengthCard from "../components/interview/StrengthCard";

import WeaknessCard from "../components/interview/WeaknessCard";

import LearningPath from "../components/interview/LearningPath";

import { evaluateInterview } from "../api/interviewApi";

function InterviewResult() {
  const { state } = useLocation();

  const interviewId = state?.interviewId;

  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState([]);

  const [strengths, setStrengths] = useState([]);

  const [weaknesses, setWeaknesses] = useState([]);

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchEvaluation();
  }, []);

  const fetchEvaluation = async () => {
    try {
      const { data } = await evaluateInterview({
        interviewId,
      });

      setResults(data.results);

      setStrengths(data.strengths);

      setWeaknesses(data.weaknesses);

      setTopics(data.recommendedTopics);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <EvaluationLoader />;
  }

  const total = results.reduce(

    (sum, item) => sum + Number(item.evaluation.score || 0),

    0

);

const average = results.length
    ? Math.round(total / results.length)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <OverallScore score={average} />

        <div className="space-y-8 mt-12">
          {results.map((item) => (
            <QuestionFeedback key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">

    <StrengthCard
        strengths={strengths}
    />

    <WeaknessCard
        weaknesses={weaknesses}
    />

</div>

<div className="mt-10">

    <LearningPath
        topics={topics}
    />
    <ActionButtons />

</div>
    </div>
  );
}

export default InterviewResult;
