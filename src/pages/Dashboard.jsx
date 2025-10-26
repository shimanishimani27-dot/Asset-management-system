// Updated: 26 Oct 2025
import { useState } from "react";
import StatCard from "../components/StatCard";
import AssetTable from "../components/AssetTable";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import zambiaGeoRaw from "../assets/geoBoundaries-ZMB-ADM0_simplified.geojson?raw";

const zambiaGeo = JSON.parse(zambiaGeoRaw);

const Dashboard = () => {
  const assetData = [
    { name: "Vehicles", value: 300 },
    { name: "Buildings", value: 180 },
    { name: "Equipment", value: 120 },
    { name: "Land", value: 80 },
  ];
  const COLORS = ["#047857", "#fb923c", "#a78bfa", "#60a5fa"];

  // Helper functions for province label positioning (centered in each province)
  const getProvinceLabelX = (provinceName) => {
    const labelPositions = {
      "Northern": 440,
      "Muchinga": 540,
      "Eastern": 620,
      "Luapula": 360,
      "Copperbelt": 420,
      "North-Western": 320,
      "Central": 450,
      "Lusaka": 440,
      "Western": 250,
      "Southern": 450
    };
    return labelPositions[provinceName] || 400;
  };
  
  const getProvinceLabelY = (provinceName) => {
    const labelPositions = {
      "Northern": 130,
      "Muchinga": 140,
      "Eastern": 220,
      "Luapula": 200,
      "Copperbelt": 180,
      "North-Western": 160,
      "Central": 240,
      "Lusaka": 290,
      "Western": 290,
      "Southern": 340
    };
    return labelPositions[provinceName] || 250;
  };

  const zambiaData = [
    { province: "Lusaka", value: 200, departments: 8, staff: 45, status: "High Activity" },
    { province: "Copperbelt", value: 150, departments: 6, staff: 38, status: "High Activity" },
    { province: "Central", value: 80, departments: 4, staff: 22, status: "Medium Activity" },
    { province: "Eastern", value: 50, departments: 3, staff: 18, status: "Medium Activity" },
    { province: "Southern", value: 60, departments: 3, staff: 20, status: "Medium Activity" },
    { province: "Western", value: 40, departments: 2, staff: 15, status: "Low Activity" },
    { province: "North-Western", value: 45, departments: 2, staff: 16, status: "Low Activity" },
    { province: "Northern", value: 35, departments: 2, staff: 12, status: "Low Activity" },
    { province: "Luapula", value: 30, departments: 2, staff: 10, status: "Low Activity" },
    { province: "Muchinga", value: 25, departments: 1, staff: 8, status: "Low Activity" },
  ];

  const getColor = (value) => {
    if (value >= 150) return "#16a34a"; // Green - High activity (150+ assets)
    if (value >= 80) return "#ea580c";  // Orange - Medium activity (80-149 assets)
    if (value >= 40) return "#9333ea";  // Purple - Low-medium activity (40-79 assets)
    return "#9ca3af"; // Gray - Low activity (<40 assets)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "High Activity": return "text-green-600 bg-green-100";
      case "Medium Activity": return "text-orange-600 bg-orange-100";
      case "Low Activity": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const [hoveredProvince, setHoveredProvince] = useState(null);

  return (
    <div className="p-6 bg-gray-50 flex-1">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">
          Get a quick snapshot of assets, purchases, and distribution across Zambia.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Assets"
          value="320,500"
          change="+5% increase from last month"
          color="border-green-500"
        />
        <StatCard
          title="Total Purchases"
          value="145,200"
          change="-20% decrease from last month"
          color="border-orange-400"
        />
        <StatCard
          title="Total Paid"
          value="88,400"
          change="+45% increase from last month"
          color="border-purple-400"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
        {/* Placeholder Bar/Line Chart */}
        <div className="col-span-2 bg-white p-5 rounded-lg shadow h-64 flex items-center justify-center text-gray-400 border-2 border-dashed">
          Chart will go here
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-4">
            Assets by Category
          </h3>
          <div className="flex justify-center items-center">
            <PieChart width={280} height={280}>
              <Pie
                data={assetData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name} (${value})`}
              >
                {assetData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>

      {/* Zambia Map Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-700 text-xl">
            Asset Distribution Across Zambia
          </h3>
          <div className="text-sm text-gray-500">
            Total Assets: <span className="font-bold text-green-600">{zambiaData.reduce((sum, p) => sum + p.value, 0)}</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Map */}
          <div className="w-full lg:w-2/3 h-96 lg:h-[500px] relative bg-gray-100 rounded-lg overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 2000, center: [27.8, -14.5] }}
              width={800}
              height={500}
            >
              <Geographies geography={zambiaGeo}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#f3f4f6"
                      stroke="#1f2937"
                      strokeWidth={2}
                      style={{
                        default: { 
                          outline: "none",
                          transition: "all 0.2s ease"
                        },
                        hover: { 
                          fill: "#e5e7eb",
                          outline: "none"
                        },
                        pressed: { 
                          fill: "#d1d5db",
                          outline: "none"
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {/* Create properly positioned, non-overlapping province boundaries */}
              {zambiaData.map((province, index) => {
                // Define non-overlapping province shapes based on actual Zambian geography
                const provinceShapes = {
                  "Northern": "M 400,80 L 500,100 L 480,160 L 420,180 L 380,140 L 400,80 Z",
                  "Muchinga": "M 500,100 L 600,120 L 580,180 L 520,160 L 500,100 Z",
                  "Eastern": "M 580,180 L 680,200 L 660,260 L 560,240 L 580,180 Z",
                  "Luapula": "M 320,160 L 420,180 L 400,240 L 340,220 L 320,160 Z",
                  "Copperbelt": "M 380,140 L 480,160 L 460,220 L 400,200 L 380,140 Z",
                  "North-Western": "M 280,120 L 380,140 L 360,200 L 300,180 L 280,120 Z",
                  "Central": "M 400,200 L 500,220 L 480,280 L 420,260 L 400,200 Z",
                  "Lusaka": "M 420,260 L 480,280 L 460,320 L 400,300 L 420,260 Z",
                  "Western": "M 200,240 L 300,260 L 280,340 L 220,320 L 200,240 Z",
                  "Southern": "M 400,300 L 500,320 L 480,380 L 420,360 L 400,300 Z"
                };
                
                const provincePath = provinceShapes[province.province] || "M 400,200 L 450,200 L 450,250 L 400,250 Z";
                
                return (
                  <g key={province.province}>
                    {/* Province shape with clear boundaries */}
                    <path
                      d={provincePath}
                      fill={getColor(province.value)}
                      fillOpacity={0.8}
                      stroke="#ffffff"
                      strokeWidth={2}
                      style={{ 
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={() => setHoveredProvince(province)}
                      onMouseLeave={() => setHoveredProvince(null)}
                    />
                    
                    {/* Province label positioned in center of shape */}
                    <text
                      x={getProvinceLabelX(province.province)}
                      y={getProvinceLabelY(province.province)}
                      fontSize="9"
                      fill="#1f2937"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ 
                        cursor: "pointer",
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9)"
                      }}
                      onMouseEnter={() => setHoveredProvince(province)}
                      onMouseLeave={() => setHoveredProvince(null)}
                    >
                      {province.province}
                    </text>
                    
                    {/* Asset count */}
                    <text
                      x={getProvinceLabelX(province.province)}
                      y={getProvinceLabelY(province.province) + 10}
                      fontSize="8"
                      fill="#1f2937"
                      fontWeight="bold"
                      textAnchor="middle"
                      style={{ 
                        cursor: "pointer",
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9)"
                      }}
                      onMouseEnter={() => setHoveredProvince(province)}
                      onMouseLeave={() => setHoveredProvince(null)}
                    >
                      {province.value}
                    </text>
                  </g>
                );
              })}
              
            </ComposableMap>
            
            {/* Map Title Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold text-gray-700">Zambia Provinces</h4>
              <p className="text-xs text-gray-500">Asset Distribution by Province</p>
            </div>
          </div>

          {/* Legend and Province Info */}
          <div className="w-full lg:w-1/3 space-y-4">
            {/* Legend */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-orange-500 rounded"></div>
                Province Activity Legend
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-gray-400" style={{backgroundColor: "#16a34a"}}></div>
                  <span className="text-sm text-gray-600">High Activity (150+ assets)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-gray-400" style={{backgroundColor: "#ea580c"}}></div>
                  <span className="text-sm text-gray-600">Medium Activity (80-149 assets)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-gray-400" style={{backgroundColor: "#9333ea"}}></div>
                  <span className="text-sm text-gray-600">Low-Medium Activity (40-79 assets)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-gray-400" style={{backgroundColor: "#9ca3af"}}></div>
                  <span className="text-sm text-gray-600">Low Activity (&lt;40 assets)</span>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  <strong>Visual Divisions:</strong> Dashed lines show province boundaries
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Circle Size:</strong> Larger circles = more assets
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <strong>Interactive:</strong> Hover over provinces for details
                </p>
              </div>
            </div>

            {/* Province Info */}
            {hoveredProvince ? (
              <div className="p-5 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-800 text-lg mb-3">
                  {hoveredProvince.province} Province
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Assets:</span>
                    <span className="font-bold text-green-700 text-lg">
                      {hoveredProvince.value}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Departments:</span>
                    <span className="font-semibold text-gray-700">
                      {hoveredProvince.departments}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Staff Count:</span>
                    <span className="font-semibold text-gray-700">
                      {hoveredProvince.staff}
                    </span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-green-200">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hoveredProvince.status)}`}>
                      {hoveredProvince.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 italic">
                  Hover over other provinces to compare data.
                </p>
              </div>
            ) : (
              <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Map Instructions</h4>
                <p className="text-sm text-gray-600">
                  Hover over any province to view detailed asset information, department count, and staff distribution.
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  <p>• Click and drag to pan the map</p>
                  <p>• Scroll to zoom in/out</p>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Quick Statistics</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600">Most Active:</span>
                  <span className="font-semibold text-blue-800">Lusaka</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Total Provinces:</span>
                  <span className="font-semibold text-blue-800">{zambiaData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600">Avg Assets/Province:</span>
                  <span className="font-semibold text-blue-800">
                    {Math.round(zambiaData.reduce((sum, p) => sum + p.value, 0) / zambiaData.length)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Table */}
      <div className="mt-6">
        <AssetTable />
      </div>
    </div>
  );
};

export default Dashboard;
