// File: src/components/dashboard/StatCard.jsx

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-blue-400",
  changeColor = "text-emerald-400",
}) {
  return (
      <div
          className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-slate-800
              bg-slate-900
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-slate-700
              hover:shadow-xl
              hover:shadow-blue-500/5
          "
      >
          {/* Background Glow */}
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />

          <div className="relative z-10 flex items-start justify-between">
              {/* Left Content */}
              <div>
                  <p className="text-sm font-medium text-slate-400">
                      {title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-white">
                      {value}
                  </h2>

                  {change && (
                      <p className={`mt-2 text-sm font-medium ${changeColor}`}>
                          {change}
                      </p>
                  )}
              </div>

              {/* Icon */}
              <div
                  className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-slate-800
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-6
                  "
              >
                  <Icon size={26} className={iconColor} />
              </div>
          </div>
      </div>
  );
}

export default StatCard;