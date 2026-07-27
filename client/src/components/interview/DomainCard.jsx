const domains = [

    "React",
    "Java",
    "JavaScript",
    "Node.js",
    "DBMS",
    "Operating System",
    "HR",
    "Frontend",
    "Backend"

];

function DomainCard({

    domain,
    setDomain,

}) {

    return (

        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">

            <h2 className="text-2xl font-bold text-white mb-6">

                Select Interview Domain

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                {

                    domains.map((item) => (

                        <button

                            key={item}

                            onClick={() => setDomain(item)}

                            className={`
                                p-5
                                rounded-2xl
                                font-semibold
                                transition-all
                                duration-300
                                ${
                                    domain === item
                                        ? "bg-blue-600 text-white scale-105 shadow-lg shadow-blue-500/30"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }
                            `}

                        >

                            {item}

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default DomainCard;