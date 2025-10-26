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

  const zambiaData = [
    { province: "Lusaka", value: 200 },
    { province: "Copperbelt", value: 150 },
    { province: "Central", value: 80 },
    { province: "Eastern", value: 50 },
    { province: "Southern", value: 60 },
    { province: "Western", value: 40 },
    { province: "North-Western", value: 45 },
    { province: "Northern", value: 35 },
    { province: "Luapula", value: 30 },
    { province: "Muchinga", value: 25 },
  ];

  const getColor = (value) => {
    if (value > 150) return "#047857";
    if (value > 80) return "#fb923c";
    return "#a78bfa";
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
        <h3 className="font-semibold text-gray-700 mb-4">
          Asset Distribution Across Zambia
        </h3>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Map */}
          <div className="w-full lg:w-2/3 h-96 lg:h-[500px]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 2000, center: [27.8, -14.5] }}
              width={800}
              height={500}
            >
              <Geographies geography={zambiaGeo}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const province =
                      geo.properties.shapeName || geo.properties.NAME_1;
                    const provinceData = zambiaData.find(
                      (p) =>
                        p.province.toLowerCase() === province?.toLowerCase()
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={provinceData ? getColor(provinceData.value) : "#ccc"}
                        stroke="#fff"
                        strokeWidth={0.5}
                        onMouseEnter={() =>
                          setHoveredProvince(
                            provinceData || { province, value: 0 }
                          )
                        }
                        onMouseLeave={() => setHoveredProvince(null)}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#22c55e", outline: "none" },
                          pressed: { fill: "#15803d", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Province Info */}
          {hoveredProvince && (
            <div className="p-5 bg-green-50 border border-green-300 rounded-lg shadow w-64">
              <h4 className="font-semibold text-gray-800 text-lg">
                {hoveredProvince.province}
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                Total Assets:{" "}
                <span className="font-bold text-green-700">
                  {hoveredProvince.value}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Hover over other provinces to compare.
              </p>
            </div>
          )}
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
