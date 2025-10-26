// Provinces.jsx — Enhanced with Visual Boundaries and Divisions
// Dated: 26 Oct 2025
import { useState } from "react";
import { MapPin, Users, Building2, TrendingUp, Eye, Edit, Trash2, Plus } from "lucide-react";

const Provinces = () => {
  const [provinces] = useState([
    { 
      name: "Lusaka", 
      assets: 200, 
      staff: 35, 
      departments: 8,
      districts: 6,
      status: "High Activity",
      population: "3.2M",
      area: "21,896 km²",
      capital: "Lusaka",
      color: "green"
    },
    { 
      name: "Copperbelt", 
      assets: 150, 
      staff: 28, 
      departments: 6,
      districts: 10,
      status: "High Activity",
      population: "2.1M",
      area: "31,328 km²",
      capital: "Ndola",
      color: "green"
    },
    { 
      name: "Central", 
      assets: 80, 
      staff: 15, 
      departments: 4,
      districts: 8,
      status: "Medium Activity",
      population: "1.7M",
      area: "94,395 km²",
      capital: "Kabwe",
      color: "orange"
    },
    { 
      name: "Eastern", 
      assets: 50, 
      staff: 12, 
      departments: 3,
      districts: 9,
      status: "Medium Activity",
      population: "1.9M",
      area: "51,476 km²",
      capital: "Chipata",
      color: "orange"
    },
    { 
      name: "Southern", 
      assets: 60, 
      staff: 18, 
      departments: 3,
      districts: 13,
      status: "Medium Activity",
      population: "1.8M",
      area: "85,283 km²",
      capital: "Livingstone",
      color: "orange"
    },
    { 
      name: "Western", 
      assets: 40, 
      staff: 10, 
      departments: 2,
      districts: 16,
      status: "Low Activity",
      population: "1.0M",
      area: "126,386 km²",
      capital: "Mongu",
      color: "purple"
    },
    { 
      name: "North-Western", 
      assets: 45, 
      staff: 16, 
      departments: 2,
      districts: 9,
      status: "Low Activity",
      population: "0.8M",
      area: "125,826 km²",
      capital: "Solwezi",
      color: "purple"
    },
    { 
      name: "Northern", 
      assets: 35, 
      staff: 12, 
      departments: 2,
      districts: 12,
      status: "Low Activity",
      population: "1.1M",
      area: "147,826 km²",
      capital: "Kasama",
      color: "purple"
    },
    { 
      name: "Luapula", 
      assets: 30, 
      staff: 10, 
      departments: 2,
      districts: 11,
      status: "Low Activity",
      population: "1.0M",
      area: "50,567 km²",
      capital: "Mansa",
      color: "purple"
    },
    { 
      name: "Muchinga", 
      assets: 25, 
      staff: 8, 
      departments: 1,
      districts: 7,
      status: "Low Activity",
      population: "0.7M",
      area: "87,806 km²",
      capital: "Chinsali",
      color: "purple"
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "High Activity": return "text-green-600 bg-green-100 border-green-200";
      case "Medium Activity": return "text-orange-600 bg-orange-100 border-orange-200";
      case "Low Activity": return "text-purple-600 bg-purple-100 border-purple-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getProvinceColor = (color) => {
    switch (color) {
      case "green": return "border-l-green-500 bg-green-50";
      case "orange": return "border-l-orange-500 bg-orange-50";
      case "purple": return "border-l-purple-500 bg-purple-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <MapPin className="text-green-600" size={32} />
            Zambian Provinces
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor provincial assets, departments, and staff distribution
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 text-sm font-medium transition ${
                viewMode === "grid" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 text-sm font-medium transition ${
                viewMode === "table" 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Table View
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Plus size={18} />
            Add Province
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Provinces</p>
              <p className="text-2xl font-bold text-gray-800">{provinces.length}</p>
            </div>
            <MapPin className="text-green-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Assets</p>
              <p className="text-2xl font-bold text-gray-800">
                {provinces.reduce((sum, p) => sum + p.assets, 0)}
              </p>
            </div>
            <Building2 className="text-blue-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Staff</p>
              <p className="text-2xl font-bold text-gray-800">
                {provinces.reduce((sum, p) => sum + p.staff, 0)}
              </p>
            </div>
            <Users className="text-orange-600" size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Districts</p>
              <p className="text-2xl font-bold text-gray-800">
                {provinces.reduce((sum, p) => sum + p.districts, 0)}
              </p>
            </div>
            <TrendingUp className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Province Cards Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provinces.map((province, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg shadow border-l-4 ${getProvinceColor(province.color)} hover:shadow-lg transition-all duration-200 cursor-pointer`}
              onClick={() => setSelectedProvince(province)}
            >
              <div className="p-6">
                {/* Province Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{province.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(province.status)}`}>
                    {province.status}
                  </span>
                </div>

                {/* Province Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Capital:</span>
                    <span className="font-semibold text-gray-800">{province.capital}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Population:</span>
                    <span className="font-semibold text-gray-800">{province.population}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Area:</span>
                    <span className="font-semibold text-gray-800">{province.area}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{province.assets}</p>
                    <p className="text-xs text-gray-600">Assets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{province.staff}</p>
                    <p className="text-xs text-gray-600">Staff</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{province.departments}</p>
                    <p className="text-xs text-gray-600">Departments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{province.districts}</p>
                    <p className="text-xs text-gray-600">Districts</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium">
                    <Eye size={16} />
                    View Details
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Province</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Capital</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Assets</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Staff</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Departments</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Districts</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {provinces.map((province, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          province.color === 'green' ? 'bg-green-500' :
                          province.color === 'orange' ? 'bg-orange-500' :
                          'bg-purple-500'
                        }`}></div>
                        <span className="font-semibold text-gray-800">{province.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{province.capital}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-green-600">{province.assets}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-blue-600">{province.staff}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-orange-600">{province.departments}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-purple-600">{province.districts}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(province.status)}`}>
                        {province.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Province Detail Modal */}
      {selectedProvince && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProvince.name} Province</h2>
                <button
                  onClick={() => setSelectedProvince(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">Basic Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital:</span>
                        <span className="font-semibold">{selectedProvince.capital}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Population:</span>
                        <span className="font-semibold">{selectedProvince.population}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-semibold">{selectedProvince.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedProvince.status)}`}>
                          {selectedProvince.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">Asset Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Assets:</span>
                        <span className="font-semibold text-green-600">{selectedProvince.assets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff Count:</span>
                        <span className="font-semibold text-blue-600">{selectedProvince.staff}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departments:</span>
                        <span className="font-semibold text-orange-600">{selectedProvince.departments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Districts:</span>
                        <span className="font-semibold text-purple-600">{selectedProvince.districts}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProvince(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Edit Province
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Provinces;
