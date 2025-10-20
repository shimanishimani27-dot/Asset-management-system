import StatCard from "../components/StatCard";
import Chart from "../components/Chart";
import AssetTable from "../components/AssetTable";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 flex-1 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Asset Management System</h1>
        <div className="flex items-center gap-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded">
            Add Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Assets"
          value="$320,500"
          change="5% increase from last month"
          color="border-green-500"
        />
        <StatCard
          title="Total Purchases"
          value="$145,200"
          change="20% decrease from last month"
          color="border-orange-400"
        />
        <StatCard
          title="Total Paid"
          value="$88,400"
          change="45% increase from last month"
          color="border-purple-400"
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 items-start">
        <div className="col-span-2">
          <Chart />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-4">Most Assets</h3>
          <div className="flex items-center justify-center h-48">
            {/* Placeholder for pie chart */}
            <div className="w-36 h-36 bg-green-100 rounded-full flex items-center justify-center">
              Pie
            </div>
          </div>
        </div>
      </div>

      <AssetTable />
    </div>
  );
};

export default Dashboard;
