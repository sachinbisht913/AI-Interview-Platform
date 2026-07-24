function StatCard({ title, value, color }) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 shadow-md">
        <h3 className="text-slate-400 text-sm">{title}</h3>
  
        <p className={`text-3xl font-bold mt-3 ${color}`}>
          {value}
        </p>
      </div>
    );
  }
  
  export default StatCard;