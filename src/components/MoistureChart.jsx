import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MoistureChart({ history, t }) {
  return (
    <section className="chart-section">
      <h2>{t.trendMoisture}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="moisture" stroke="#2a9d8f" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}