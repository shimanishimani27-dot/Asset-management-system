import { Plus, Search, Filter, Edit, Trash2, Download } from "lucide-react";

function Products() {
  const products = [
    {
      id: "P001",
      name: "Laptop",
      category: "Electronics",
      price: "$999",
      stock: 45,
      status: "In Stock",
    },
    {
      id: "P002",
      name: "Office Chair",
      category: "Furniture",
      price: "$199",
      stock: 12,
      status: "Low Stock",
    },
    {
      id: "P003",
      name: "Desk Lamp",
      category: "Accessories",
      price: "$49",
      stock: 78,
      status: "In Stock",
    },
    {
      id: "P004",
      name: "Monitor",
      category: "Electronics",
      price: "$299",
      stock: 3,
      status: "Low Stock",
    },
    {
      id: "P005",
      name: "Keyboard",
      category: "Electronics",
      price: "$79",
      stock: 0,
      status: "Out of Stock",
    },
  ];

  const getStockColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download size={20} />
            Export
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
            style={{ backgroundColor: "var(--color-zGreen)" }}
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
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
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Stock
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
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {product.id}
                </td>
                <td className="px-6 py-4 text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {product.price}
                </td>
                <td className="px-6 py-4 text-gray-800">{product.stock}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStockColor(
                      product.status
                    )}`}
                  >
                    {product.status}
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

export default Products;
