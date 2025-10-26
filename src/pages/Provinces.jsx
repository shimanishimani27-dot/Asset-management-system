// Provinces.jsx — Dated: 26 Oct 2025
import { useState } from "react";

const Provinces = () => {
  const [provinces] = useState([
    { name: "Lusaka", assets: 200, staff: 35 },
    { name: "Copperbelt", assets: 150, staff: 28 },
    { name: "Central", assets: 80, staff: 15 },
    { name: "Eastern", assets: 50, staff: 12 },
    { name: "Southern", assets: 60, staff: 18 },
    { name: "Western", assets: 40, staff: 10 },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Provinces</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3 px-2">Province Name</th>
              <th className="py-3 px-2">Total Departments</th>
              <th className="py-3 px-2">Staff Assigned</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {provinces.map((province, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">{province.name}</td>
                <td className="py-2 px-2">{province.assets}</td>
                <td className="py-2 px-2">{province.staff}</td>
                <td className="py-2 px-2">
                  <button className="text-green-600 mr-2">Edit</button>
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

export default Provinces;
