import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Clock,
} from "lucide-react";

function Purchases() {
  const purchases = [
    {
      id: "PUR001",
      supplier: "Tech Supplies Inc",
      date: "2025-10-10",
      amount: "$5,400",
      items: 12,
      status: "Completed",
    },
    {
      id: "PUR002",
      supplier: "Office Furniture Co",
      date: "2025-10-12",
      amount: "$3,200",
      items: 8,
      status: "Pending",
    },
    {
      id: "PUR003",
      supplier: "Electronics Hub",
      date: "2025-10-14",
      amount: "$8,900",
      items: 15,
      status: "Processing",
    },
    {
      id: "PUR004",
      supplier: "Accessories World",
      date: "2025-10-16",
      amount: "$1,500",
      items: 25,
      status: "Completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Purchases</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "var(--color-zGreen)" }}
        >
          <Plus size={20} />
          New Purchase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Total Purchases</h3>
            <FileText size={20} style={{ color: "var(--color-zGreen)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800">234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Total Amount</h3>
            <DollarSign size={20} style={{ color: "var(--color-zOrange)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800">$189,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm">Pending</h3>
            <Clock size={20} style={{ color: "var(--color-zRed)" }} />
          </div>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search purchases..."
              className="flex-1 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            Filter
          </button>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Purchase ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {purchase.id}
                </td>
                <td className="px-6 py-4 text-gray-800">{purchase.supplier}</td>
                <td className="px-6 py-4 text-gray-600">{purchase.date}</td>
                <td className="px-6 py-4 text-gray-800">{purchase.items}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {purchase.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      purchase.status
                    )}`}
                  >
                    {purchase.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchases;
