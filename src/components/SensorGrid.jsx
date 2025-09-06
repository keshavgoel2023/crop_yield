import SensorCard from "./SensorCard";

export default function SensorGrid({ data, t }) {
  return (
    <div className="grid">
      <SensorCard label={t.moisture} value={data.moisture} />
      <SensorCard label={t.ph} value={data.ph} />
      <SensorCard label={t.tds} value={data.tds} />
      <SensorCard label={t.temperature} value={`${data.temperature} °C`} />
      <SensorCard label={t.humidity} value={`${data.humidity}%`} />
    </div>
  );
}