import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "W1", idle: 100, vault: 100 },
  { week: "W3", idle: 100, vault: 103 },
  { week: "W5", idle: 100, vault: 107 },
  { week: "W7", idle: 100, vault: 112 },
  { week: "W9", idle: 100, vault: 118 },
  { week: "W12", idle: 100, vault: 126 },
];

function YieldChart() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        marginTop: "60px",
        padding: "25px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(139,92,246,0.3)",
        borderRadius: "24px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(139,92,246,0.15)",
      }}
    >
      <h2 style={{ color: "#8B5CF6", marginBottom: "20px" }}>
        Yield Growth (12 Weeks)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="week" stroke="#A1A1AA" />
          <YAxis stroke="#A1A1AA" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="vault"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.25}
          />
          <Area
            type="monotone"
            dataKey="idle"
            stroke="#555"
            fill="#555"
            fillOpacity={0.08}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default YieldChart;