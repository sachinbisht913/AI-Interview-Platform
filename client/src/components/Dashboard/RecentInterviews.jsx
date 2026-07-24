function RecentInterviews() {

    const interviews = [
      {
        id: 1,
        domain: "Frontend",
        score: 88,
        status: "Passed",
        date: "20 Jul",
      },
      {
        id: 2,
        domain: "Java",
        score: 79,
        status: "Passed",
        date: "18 Jul",
      },
      {
        id: 3,
        domain: "HR",
        score: 92,
        status: "Excellent",
        date: "15 Jul",
      },
    ];
  
    return (
      <div className="bg-slate-800 rounded-xl p-6 mt-8">
  
        <h2 className="text-2xl font-semibold text-white mb-5">
          Recent Interviews
        </h2>
  
        <table className="w-full text-left">
  
          <thead>
  
            <tr className="text-slate-400 border-b border-slate-700">
  
              <th className="pb-3">Domain</th>
              <th className="pb-3">Score</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
  
            </tr>
  
          </thead>
  
          <tbody className="text-white">
  
            {interviews.map((item) => (
  
              <tr
                key={item.id}
                className="border-b border-slate-700 hover:bg-slate-700 transition"
              >
  
                <td className="py-4">{item.domain}</td>
  
                <td>{item.score}</td>
  
                <td>
  
                  <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                    {item.status}
                  </span>
  
                </td>
  
                <td>{item.date}</td>
  
              </tr>
  
            ))}
  
          </tbody>
  
        </table>
  
      </div>
    );
  }
  
  export default RecentInterviews;