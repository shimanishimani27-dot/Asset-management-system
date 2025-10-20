import { Plus, Search, Filter, Edit, Trash2 } from "lucide-react";

function Orders() {
  const orders = [
    {
      id: "#1001",
      customer: "John Doe",
      date: "2025-10-15",
      amount: "$234.00",
      status: "Completed",
    },
    {
      id: "#1002",
      customer: "Jane Smith",
      date: "2025-10-16",
      amount: "$456.00",
      status: "Pending",
    },
    {
      id: "#1003",
      customer: "Bob Johnson",
      date: "2025-10-17",
      amount: "$789.00",
      status: "Processing",
    },
    {
      id: "#1004",
      customer: "Alice Brown",
      date: "2025-10-18",
      amount: "$123.00",
      status: "Completed",
    },
    {
      id: "#1005",
      customer: "Charlie Wilson",
      date: "2025-10-19",
      amount: "$567.00",
      status: "Cancelled",
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
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: "var(--color-zGreen)" }}
        >
          <Plus size={20} />
          New Order
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
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
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Date
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
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-gray-800">{order.customer}</td>
                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {order.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
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

export default Orders;
