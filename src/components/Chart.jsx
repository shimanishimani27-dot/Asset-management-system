import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const sampleData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 300 },
  { month: "Mar", value: 500 },
  { month: "Apr", value: 200 },
];

const Chart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={sampleData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default Chart;
