import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ActionButtons from "../components/interview/ActionButtons";

import InterviewHero from "../components/interview/InterviewHero";
import ScoreOverview from "../components/interview/ScoreOverview";
import AISummary from "../components/interview/AISummary";
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
  
  const [overallScore, setOverallScore] = useState(0);
  
  const [technicalScore, setTechnicalScore] = useState(0);
  
  const [communicationScore, setCommunicationScore] = useState(0);
  
  const [confidenceScore, setConfidenceScore] = useState(0);
  
  const [problemSolvingScore, setProblemSolvingScore] = useState(0);
  
  const [summary, setSummary] = useState("");

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

      setOverallScore(data.overallScore);

setTechnicalScore(data.technicalScore);

setCommunicationScore(data.communicationScore);

setConfidenceScore(data.confidenceScore);

setProblemSolvingScore(data.problemSolvingScore);

setSummary(data.summary);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <EvaluationLoader />;
  }

 

  return (
    <div
    className="
    interview-result-page
    min-h-screen
    bg-slate-950
    text-white
    px-4
    py-8

    light:bg-slate-50
    light:text-slate-900"
>
      <div className="max-w-6xl mx-auto px-6">
      <InterviewHero
    overallScore={overallScore}
    userName="User"
/>

<div className="mt-8">
<ScoreOverview
    overallScore={overallScore}
    technicalScore={technicalScore}
    communicationScore={communicationScore}
    confidenceScore={confidenceScore}
    problemSolvingScore={problemSolvingScore}
/>
</div>

<div className="mt-8">
<AISummary
    summary={summary}
/>
</div>

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
