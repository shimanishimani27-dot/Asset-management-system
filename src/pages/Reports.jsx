import {
  Download,
  BarChart3,
  FileText,
  Package,
  TrendingUp,
} from "lucide-react";

function Reports() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "var(--color-zGreen)" }}
        >
          <Download size={20} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Sales Report</h3>
            <BarChart3 size={20} style={{ color: "var(--color-zGreen)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">$45,678</p>
          <p className="text-sm text-green-600">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Purchase Report</h3>
            <FileText size={20} style={{ color: "var(--color-zOrange)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">$32,100</p>
          <p className="text-sm text-green-600">+8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Inventory Report</h3>
            <Package size={20} style={{ color: "var(--color-zGold)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">1,234</p>
          <p className="text-sm text-red-600">-3% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Profit Margin</h3>
            <TrendingUp size={20} style={{ color: "var(--color-zRed)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">23.5%</p>
          <p className="text-sm text-green-600">+2% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Generate Report
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg outline-none">
                <option>Sales Report</option>
                <option>Purchase Report</option>
                <option>Inventory Report</option>
                <option>Profit & Loss Report</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                />
              </div>
            </div>
            <button
              className="w-full px-4 py-2 text-white rounded-lg"
              style={{ backgroundColor: "var(--color-zGreen)" }}
            >
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Reports
          </h2>
          <div className="space-y-3">
            {[
              {
                name: "Sales Report Q3 2025",
                date: "Oct 15, 2025",
                size: "2.4 MB",
              },
              {
                name: "Inventory Report Sep 2025",
                date: "Oct 01, 2025",
                size: "1.8 MB",
              },
              {
                name: "Purchase Report Aug 2025",
                date: "Sep 15, 2025",
                size: "1.2 MB",
              },
              {
                name: "Profit & Loss Q2 2025",
                date: "Aug 30, 2025",
                size: "3.1 MB",
              },
            ].map((report, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{report.name}</p>
                    <p className="text-sm text-gray-600">
                      {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded">
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
