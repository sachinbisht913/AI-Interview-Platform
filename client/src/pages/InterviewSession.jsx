import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Clock, LogOut } from "lucide-react";
import { submitAnswer } from "../api/interviewApi";

function InterviewSession() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const interview = state?.interview;

  const interviewId = state?.interviewId;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  if (!interview) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <button
          onClick={() => navigate("/mock-interview")}
          className="bg-blue-600 px-6 py-3 rounded-xl text-white"
        >
          Start Interview
        </button>
      </div>
    );
  }

  const questions = interview.questions;

  const question = questions[currentQuestion];

  const handleNext = async () => {
    try {
      await submitAnswer({
        interviewId,

        questionNo: currentQuestion + 1,

        topic: question.topic,

        question: question.question,

        expectedAnswer: question.expectedAnswer,

        userAnswer: answer,
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);

        setAnswer("");
      } else {
        navigate("/interview-result", {
          state: {
            interviewId,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}

      <div className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold">AI Mock Interview</h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock size={20} />

              <span>15:00</span>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl"
            >
              <LogOut size={18} />
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="max-w-5xl mx-auto py-14 px-6">
        {/* Progress */}

        <div className="mb-10">
          <div className="flex justify-between mb-3">
            <span>
              Question {currentQuestion + 1} / {questions.length}
            </span>

            <span>
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-10">
          <p className="text-blue-400 text-lg mb-4">{question.topic}</p>

          <h2 className="text-3xl font-bold leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Answer */}

        <div className="mt-10">
          <textarea
            rows={8}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 outline-none resize-none"
          />
          <div className="flex justify-end mt-2">
            <span className="text-slate-400">{answer.length} characters</span>
          </div>
        </div>

        {/* Next */}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!answer.trim()}
            className={`

flex
items-center
gap-3

px-8
py-4

rounded-2xl

font-semibold

transition-all

${
  answer.trim()
    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105"
    : "bg-slate-700 cursor-not-allowed"
}

`}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Interview"
              : "Next Question"}

            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSession;
