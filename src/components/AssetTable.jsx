 const AssetTable = ({ assets: inputAssets }) => {
  const assets = inputAssets || [
    { name: "Laptop", id: "LAP-001", desc: "Dell Latitude 7420", type: "Laptop", status: "Good" },
    { name: "Desktop", id: "DESK-010", desc: "HP ProDesk 600", type: "Desktop", status: "Repair" },
    { name: "Printer", id: "PRN-203", desc: "Canon i-SENSYS LBP226dw", type: "Printer", status: "Good" },
    { name: "Keyboard", id: "KBD-517", desc: "Logitech K120", type: "Keyboard", status: "Bad" },
  ];

  return (
    <div className="bg-white p-6 shadow rounded-md mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">Asset List</h3>
        <div className="text-sm text-gray-500">Showing {assets.length} entries</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="py-3">Asset Name</th>
              <th className="py-3">Asset ID</th>
              <th className="py-3">Description</th>
              <th className="py-3">Type</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {assets.map((item, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3">{item.name}</td>
                <td className="py-3 text-gray-600">{item.id}</td>
                <td className="py-3 text-gray-600">{item.desc}</td>
                <td className="py-3 text-gray-600">{item.type}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Bad"
                        ? "bg-red-100 text-red-600"
                        : item.status === "Repair"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-green-600 mr-3">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
