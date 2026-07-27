import { useState } from "react";

import DomainCard from "./DomainCard";
import DifficultySelector from "./DifficultySelector";
import QuestionSelector from "./QuestionSelector";
import StartInterviewButton from "./StartInterviewButton";
// import Navbar from "../layout/Navbar";
function InterviewSetup() {

    const [domain, setDomain] = useState("React");
    const [difficulty, setDifficulty] = useState("Medium");
    const [questions, setQuestions] = useState(5);

    return (

        <div className="max-w-6xl mx-auto py-16 px-6">
            {/* <Navbar /> */}

            <h1 className="text-5xl font-bold text-white text-center">

                AI Mock Interview

            </h1>

            <p className="text-slate-400 text-center mt-4">

                Practice with AI-powered technical interviews.

            </p>
            <div className="mt-4 flex flex-col gap-5">
            <DomainCard
                domain={domain}
                setDomain={setDomain}
            />

            <DifficultySelector
                difficulty={difficulty}
                setDifficulty={setDifficulty}
            />

            <QuestionSelector
                questions={questions}
                setQuestions={setQuestions}
            />

            <StartInterviewButton
                domain={domain}
                difficulty={difficulty}
                questions={questions}
            />
            </div>

            

        </div>

    );

}

export default InterviewSetup;