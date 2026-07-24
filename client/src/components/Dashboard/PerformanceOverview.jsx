function PerformanceOverview() {
    const weakTopics = [
      "Recursion",
      "Dynamic Programming",
      "SQL Joins",
    ];
  
    const strongTopics = [
      "HTML",
      "CSS",
      "React",
    ];
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 w-98">
  
        {/* Weak Topics */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-red-400 mb-5">
            Weak Topics
          </h2>
  
          <div className="space-y-3 ">
            {weakTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg px-4 py-3"
              >
                ❌ {topic}
              </div>
            ))}
          </div>
        </div>
  
        {/* Strong Topics */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-5">
            Strong Topics
          </h2>
  
          <div className="space-y-3">
            {strongTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg px-4 py-3"
              >
                ✅ {topic}
              </div>
            ))}
          </div>
        </div>
  
      </div>
    );
  }
  
  export default PerformanceOverview;