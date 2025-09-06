import "../App.css";

export default function SensorCard({ label, value }) {
  return (
    <div className="card">
      <h3 className="card-title">{label}</h3>
      <p className="card-value">{value}</p>
    </div>
  );
}
