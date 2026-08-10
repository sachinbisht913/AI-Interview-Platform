// File: src/components/interview/DomainCard.jsx

const domains = [
    "React",
    "Java",
    "JavaScript",
    "Node.js",
    "DBMS",
    "Operating System",
    "HR",
    "Frontend",
    "Backend",
];

function DomainCard({ domain, setDomain }) {

    return (

        <div
            className="
                domain-card
                rounded-3xl
                border
                border-slate-800
                bg-slate-900
                p-5

                sm:p-6

                lg:p-8
            "
        >

            <h2
                className="
                    domain-card-title
                    mb-5
                    text-xl
                    font-bold

                    sm:text-2xl
                "
            >
                Select Interview Domain
            </h2>


            <div
                className="
                    grid
                    grid-cols-1
                    gap-3

                    sm:grid-cols-2
                    sm:gap-4

                    md:grid-cols-3

                    lg:grid-cols-4
                    lg:gap-5
                "
            >

                {domains.map((item) => {

                    const selected = domain === item;

                    return (

                        <button
                            key={item}
                            type="button"
                            onClick={() => setDomain(item)}
                            className={`
                                min-h-[52px]
                                rounded-2xl
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                transition-all
                                duration-200

                                ${
                                    selected
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "domain-option"
                                }
                            `}
                        >
                            {item}
                        </button>

                    );

                })}

            </div>

        </div>

    );
}

export default DomainCard;