// Departments.jsx — Dated: 26 Oct 2025
import { useState } from "react";

const Departments = () => {
  const [departments] = useState([
    { name: "IT", assets: 50, staff: 10 },
    { name: "Finance", assets: 40, staff: 8 },
    { name: "HR", assets: 20, staff: 5 },
    { name: "Procurement", assets: 30, staff: 7 },
    { name: "Operations", assets: 25, staff: 6 },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Departments</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3 px-2">Department Name</th>
              <th className="py-3 px-2">Total Assets</th>
              <th className="py-3 px-2">Staff Count</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {departments.map((dept, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">{dept.name}</td>
                <td className="py-2 px-2">{dept.assets}</td>
                <td className="py-2 px-2">{dept.staff}</td>
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

export default Departments;
