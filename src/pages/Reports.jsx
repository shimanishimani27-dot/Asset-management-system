// Updated: 26 Oct 2025
import {
  Download,
  BarChart3,
  FileText,
  Package,
  TrendingUp,
} from "lucide-react";

function Reports() {
  const reports = [
    {
      title: "Sales Report Q3 2025",
      date: "Oct 15, 2025",
      size: "2.4 MB",
    },
    {
      title: "Inventory Report Sep 2025",
      date: "Oct 01, 2025",
      size: "1.8 MB",
    },
    {
      title: "Purchase Report Aug 2025",
      date: "Sep 15, 2025",
      size: "1.2 MB",
    },
    {
      title: "Profit & Loss Q2 2025",
      date: "Aug 30, 2025",
      size: "3.1 MB",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600 mt-1">
            View insights, generate summaries, and export analytics.
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2 text-white rounded-lg shadow hover:opacity-90 transition"
          style={{ backgroundColor: "var(--color-zGreen)" }}
        >
          <Download size={18} />
          Export All Reports
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            title: "Sales Report",
            value: "$45,678",
            change: "+12% from last month",
            icon: <BarChart3 size={22} style={{ color: "var(--color-zGreen)" }} />,
            color: "text-green-600",
          },
          {
            title: "Purchase Report",
            value: "$32,100",
            change: "+8% from last month",
            icon: <FileText size={22} style={{ color: "var(--color-zOrange)" }} />,
            color: "text-green-600",
          },
          {
            title: "Inventory Report",
            value: "1,234",
            change: "-3% from last month",
            icon: <Package size={22} style={{ color: "var(--color-zGold)" }} />,
            color: "text-red-600",
          },
          {
            title: "Profit Margin",
            value: "23.5%",
            change: "+2% from last month",
            icon: <TrendingUp size={22} style={{ color: "var(--color-zRed)" }} />,
            color: "text-green-600",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-600 text-sm">{card.title}</h3>
              {card.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-1">
              {card.value}
            </p>
            <p className={`text-sm ${card.color}`}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Generate + Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generate Report Form */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Generate New Report
          </h2>
          <div className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-300">
                <option>Sales Report</option>
                <option>Purchase Report</option>
                <option>Inventory Report</option>
                <option>Profit & Loss Report</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            <button
              className="w-full px-4 py-2 mt-2 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
              style={{ backgroundColor: "var(--color-zGreen)" }}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Reports
          </h2>
          <div className="space-y-3">
            {reports.map((report, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {report.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded transition">
                  <Download size={16} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
