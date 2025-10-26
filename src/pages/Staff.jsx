// Staff.jsx — Dated: 26 Oct 2025
import { useState } from "react";

const Staff = () => {
  const [staffList] = useState([
    { name: "John Doe", id: "STF001", department: "IT", province: "Lusaka" },
    { name: "Jane Smith", id: "STF002", department: "Finance", province: "Copperbelt" },
    { name: "Mike Johnson", id: "STF003", department: "HR", province: "Central" },
    { name: "Anna Brown", id: "STF004", department: "Procurement", province: "Southern" },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Staff</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Staff ID</th>
              <th className="py-3 px-2">Department</th>
              <th className="py-3 px-2">Province</th>
              <th className="py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {staffList.map((staff, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">{staff.name}</td>
                <td className="py-2 px-2">{staff.id}</td>
                <td className="py-2 px-2">{staff.department}</td>
                <td className="py-2 px-2">{staff.province}</td>
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

export default Staff;
