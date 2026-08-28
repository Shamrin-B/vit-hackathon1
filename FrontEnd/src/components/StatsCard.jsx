function StatsCard({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(139,92,246,0.3)",
        borderRadius: "20px",
        padding: "24px",
        width: "220px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 20px rgba(139,92,246,0.2)",
      }}
    >
      <p style={{ color: "#A1A1AA", marginBottom: "10px" }}>{title}</p>

      <h2 style={{ color: "#8B5CF6", margin: 0 }}>{value}</h2>
    </div>
  );
}

export default StatsCard;