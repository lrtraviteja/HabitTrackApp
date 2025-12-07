const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;
