function StrengthCard({ strengths }) {

    return (

        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8">

            <h2 className="text-2xl text-green-400 font-bold mb-6">

                Strengths

            </h2>

            <div className="space-y-3">

                {strengths.map((item,index)=>(

                    <div
                        key={index}
                        className="bg-slate-800 rounded-xl p-4"
                    >

                        {item}

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StrengthCard;