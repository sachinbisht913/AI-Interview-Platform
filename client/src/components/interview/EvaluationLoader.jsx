import { Loader2 } from "lucide-react";

function EvaluationLoader() {

    return (

        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">

            <Loader2

                size={60}

                className="animate-spin text-blue-500"

            />

            <h2 className="text-white text-3xl mt-8">

                Evaluating Your Interview

            </h2>

            <p className="text-slate-400 mt-3">

                Please wait...

            </p>

        </div>

    );

}

export default EvaluationLoader;