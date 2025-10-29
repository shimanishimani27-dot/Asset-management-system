// Updated: 26 Oct 2025
import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import AssetTable from "../components/AssetTable";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import zmbAdm1 from "../assets/geoBoundaries-ZMB-ADM1_simplified.geojson";

const Dashboard = () => {
  const assetData = [
    { name: "Laptops", value: 120 },
    { name: "Desktops", value: 90 },
    { name: "Printers", value: 60 },
    { name: "Keyboards", value: 50 },
  ];
  // Approximate province centroids (lon, lat)
  const provinceCenters = [
    { province: "Northern", coordinates: [31.5, -9.1] },
    { province: "Muchinga", coordinates: [32.8, -10.2] },
    { province: "Eastern", coordinates: [32.8, -13.6] },
    { province: "Luapula", coordinates: [29.7, -10.9] },
    { province: "Copperbelt", coordinates: [28.6, -12.6] },
    { province: "North-Western", coordinates: [25.7, -12.0] },
    { province: "Central", coordinates: [29.4, -14.5] },
    { province: "Lusaka", coordinates: [28.3, -15.4] },
    { province: "Western", coordinates: [23.6, -15.0] },
    { province: "Southern", coordinates: [27.1, -16.7] },
  ];
  const COLORS = ["#047857", "#fb923c", "#a78bfa", "#60a5fa"];

  // Load assets from backend for consistency with Assets page
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/assets');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (Array.isArray(data)) setAssets(data);
      } catch {}
    };
    load();
  }, []);

  // Map to AssetTable format
  const assetsForTable = assets.map(a => ({
    name: a.name || 'Unnamed',
    id: a.tag || a._id || 'N/A',
    desc: a.category || a.name || '',
    type: a.category || 'Unknown',
    status: a.condition || 'Good',
  }));

  const goodCount = assetsForTable.filter(a => a.status === 'Good').length;
  const nonGoodCount = assetsForTable.length - goodCount;

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
          Snapshot of ICT assets and their conditions across Zambia.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Assets"
          value={(assetsForTable.length || 0).toLocaleString()}
          change="Across laptops, desktops, printers, keyboards"
          color="border-green-500"
        />
        <StatCard
          title="In Good Condition"
          value={(goodCount || 0).toString()}
          change="Operational"
          color="border-green-500"
        />
        <StatCard
          title="In Repair / Bad"
          value={(nonGoodCount || 0).toString()}
          change="Under maintenance or decommission"
          color="border-orange-400"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-8">
        {/* Placeholder Bar/Line Chart */}
        <div className="col-span-2 bg-white p-5 rounded-lg shadow h-64">
          <h3 className="font-semibold text-gray-700 mb-4">Assets by Province</h3>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zambiaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="province" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value">
                  {zambiaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700 mb-4">Assets by Category</h3>
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
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 2000, center: [27.8, -14.5] }} width={800} height={500}>
              <Geographies geography={zmbAdm1}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const props = geo.properties || {};
                    const name = (props.shapeName || props.shapeName_en || props.NAME_1 || props.ADMIN || "").toString();
                    const match = zambiaData.find(p => p.province.toLowerCase() === name.toLowerCase());
                    const fill = match ? getColor(match.value) : "#e5e7eb";
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="none"
                        onMouseEnter={() => setHoveredProvince(match || { province: name, value: 0, departments: 0, staff: 0, status: "" })}
                        onMouseLeave={() => setHoveredProvince(null)}
                        style={{
                          default: { outline: "none", transition: "all 0.2s ease" },
                          hover: { opacity: 0.9, outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {/* Province border overlay (drawn on top) */}
              <Geographies geography={zmbAdm1}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={`border-${geo.rsmKey}`}
                      geography={geo}
                      fill="none"
                      stroke="#111827"
                      strokeWidth={2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ default: { outline: "none" }, hover: { outline: "none" }, pressed: { outline: "none" } }}
                      pointerEvents="none"
                    />
                  ))
                }
              </Geographies>
              {/* Province labels */}
              {provinceCenters.map((c) => {
                const match = zambiaData.find(p => p.province.toLowerCase() === c.province.toLowerCase());
                return (
                  <Marker key={c.province} coordinates={c.coordinates}>
                    {/* Halo */}
                    <text y={-2} textAnchor="middle" fontSize={10} stroke="#ffffff" strokeWidth={3} paintOrder="stroke" fill="#111827">
                      {c.province}
                    </text>
                    {/* Label */}
                    <text y={-2} textAnchor="middle" fontSize={10} fill="#111827">
                      {c.province}
                    </text>
                    {match && (
                      <text y={10} textAnchor="middle" fontSize={9} fill="#374151">
                        {match.value}
                      </text>
                    )}
                  </Marker>
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
        <AssetTable assets={assetsForTable} />
      </div>
    </div>
  );
};

export default Dashboard;
