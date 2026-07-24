
import { CheckCircle, AlertTriangle } from "lucide-react";
import GlassCard from "../common/GlassCard";

function SectionCard({

    title,

    items,

    color,

}) {

    const positive = color.includes("green");

    return (

        <GlassCard className="p-8">

            <h2 className={`text-3xl font-bold ${color}`}>

                {title}

            </h2>

            <div className="space-y-4 mt-8">

                {

                    items?.map((item,index)=>(

                        <div

                            key={index}

                            className="flex items-start gap-4 bg-slate-800 rounded-2xl p-5"

                        >

                            {

                                positive

                                ?

                                <CheckCircle
                                    className="text-green-400 mt-1"
                                    size={22}
                                />

                                :

                                <AlertTriangle
                                    className="text-red-400 mt-1"
                                    size={22}
                                />

                            }

                            <p className="text-slate-200">

                                {item}

                            </p>

                        </div>

                    ))

                }

            </div>

        </GlassCard>

    );

}

export default SectionCard;