const StatsCard = ({ title, value, change, color = "border-green-500" }) => {
  return (
    <div className={`p-4 bg-white shadow rounded-md border-t-4 ${color}`}>
      <h3 className="text-gray-600 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{change}</p>
    </div>
  );
};

export default StatsCard;
