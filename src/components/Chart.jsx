import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 20000 },
  { month: "Feb", value: 25000 },
  { month: "Mar", value: 30000 },
  { month: "Apr", value: 25000 },
  { month: "May", value: 35000 },
  { month: "Jun", value: 58000 },
  { month: "Jul", value: 40000 },
  { month: "Aug", value: 30000 },
  { month: "Sep", value: 30000 },
  { month: "Oct", value: 29000 },
  { month: "Nov", value: 28000 },
  { month: "Dec", value: 25000 },
];

const Chart = () => {
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-gray-700">Assets Report</h3>
        <p className="text-sm text-gray-400">Monthly</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#16a34a" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
