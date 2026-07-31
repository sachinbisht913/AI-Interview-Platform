// File: src/components/dashboard/RecentInterviews.jsx

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Globe,
  Layers3,
} from "lucide-react";

const interviews = [
  {
      id: 1,
      title: "React Developer",
      category: "Frontend",
      date: "Today • 10:30 AM",
      score: 92,
      status: "Completed",
      icon: Globe,
      color: "text-blue-400",
  },
  {
      id: 2,
      title: "Java Programming",
      category: "Programming",
      date: "Yesterday",
      score: 86,
      status: "Completed",
      icon: Code2,
      color: "text-orange-400",
  },
  {
      id: 3,
      title: "DBMS Interview",
      category: "Database",
      date: "2 Days Ago",
      score: 80,
      status: "Completed",
      icon: Database,
      color: "text-violet-400",
  },
  {
      id: 4,
      title: "Operating System",
      category: "Core Subject",
      date: "Tomorrow • 7:00 PM",
      score: "--",
      status: "Scheduled",
      icon: Layers3,
      color: "text-cyan-400",
  },
];

function RecentInterviews() {
  return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
              <div>
                  <h2 className="text-2xl font-bold text-white">
                      Recent Interviews
                  </h2>

                  <p className="mt-1 text-slate-400">
                      Your latest interview sessions and results.
                  </p>
              </div>

              <button
                  className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-700
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-slate-300
                      transition-all
                      duration-300
                      hover:border-blue-500
                      hover:text-white
                  "
              >
                  View All
                  <ArrowRight size={16} />
              </button>
          </div>

          {/* Interview List */}
          <div className="space-y-4">
              {interviews.map((item) => {
                  const Icon = item.icon;

                  return (
                      <div
                          key={item.id}
                          className="
                              group
                              flex
                              items-center
                              justify-between
                              rounded-2xl
                              border
                              border-slate-800
                              bg-slate-950/60
                              p-5
                              transition-all
                              duration-300
                              hover:border-slate-700
                              hover:bg-slate-800/40
                          "
                      >
                          {/* Left */}
                          <div className="flex items-center gap-4">
                              <div
                                  className="
                                      flex
                                      h-14
                                      w-14
                                      items-center
                                      justify-center
                                      rounded-2xl
                                      bg-slate-800
                                  "
                              >
                                  <Icon
                                      size={26}
                                      className={item.color}
                                  />
                              </div>

                              <div>
                                  <h3 className="font-semibold text-white">
                                      {item.title}
                                  </h3>

                                  <p className="mt-1 text-sm text-slate-400">
                                      {item.category}
                                  </p>

                                  <p className="mt-2 text-xs text-slate-500">
                                      {item.date}
                                  </p>
                              </div>
                          </div>

                          {/* Right */}
                          <div className="flex items-center gap-6">
                              <div className="text-right">
                                  <p className="text-sm text-slate-400">
                                      Score
                                  </p>

                                  <h3 className="mt-1 text-2xl font-bold text-white">
                                      {item.score}
                                      {item.score !== "--" && "%"}
                                  </h3>
                              </div>

                              {item.status === "Completed" ? (
                                  <div
                                      className="
                                          flex
                                          items-center
                                          gap-2
                                          rounded-full
                                          bg-emerald-500/10
                                          px-3
                                          py-2
                                          text-sm
                                          font-medium
                                          text-emerald-400
                                      "
                                  >
                                      <CheckCircle2 size={16} />
                                      Completed
                                  </div>
                              ) : (
                                  <div
                                      className="
                                          flex
                                          items-center
                                          gap-2
                                          rounded-full
                                          bg-amber-500/10
                                          px-3
                                          py-2
                                          text-sm
                                          font-medium
                                          text-amber-400
                                      "
                                  >
                                      <Clock3 size={16} />
                                      Scheduled
                                  </div>
                              )}
                          </div>
                      </div>
                  );
              })}
          </div>
      </section>
  );
}

export default RecentInterviews;