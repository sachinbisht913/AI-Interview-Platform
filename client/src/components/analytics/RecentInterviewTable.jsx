function RecentInterviewTable({ data }) {

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        
        <h2 className="text-2xl font-bold text-white mb-6">
        
        Recent Interviews
        
        </h2>
        
        <table className="w-full">
        
        <thead>
        
        <tr className="text-slate-400">
        
        <th className="text-left pb-4">
        
        Domain
        
        </th>
        
        <th>
        
        Score
        
        </th>
        
        <th>
        
        Date
        
        </th>
        
        </tr>
        
        </thead>
        
        <tbody>
        
        {
        
        data.map((item,index)=>(
        
        <tr
        
        key={index}
        
        className="border-t border-slate-800"
        
        >
        
        <td className="py-4">
        
        {item.domain}
        
        </td>
        
        <td>
        
        {item.overall_score}%
        
        </td>
        
        <td>
        
        {
        
        new Date(item.created_at)
        
        .toLocaleDateString()
        
        }
        
        </td>
        
        </tr>
        
        ))
        
        }
        
        </tbody>
        
        </table>
        
        </div>
        
        );

}

export default RecentInterviewTable;