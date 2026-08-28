function StrategyPanel() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        marginTop: "50px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(139,92,246,0.3)",
        borderRadius: "24px",
        padding: "30px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 20px rgba(139,92,246,0.15)",
      }}
    >
      <h2 style={{ color: "#8B5CF6" }}>Create DCA Strategy</h2>

      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        <div>
          <label>Token Pair</label>
          <select style={inputStyle}>
            <option>ETH / USDC</option>
            <option>BTC / USDC</option>
          </select>
        </div>

        <div>
          <label>DCA Amount</label>
          <input style={inputStyle} placeholder="100 USDC" />
        </div>

        <div>
          <label>Frequency</label>
          <select style={inputStyle}>
            <option>Weekly</option>
            <option>Biweekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div>
          <label>Max Delay (Hours)</label>
          <input type="range" min="0" max="72" />
        </div>

        <button
          style={{
            background: "#8B5CF6",
            color: "white",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save Strategy
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  background: "#18181B",
  color: "white",
  border: "1px solid #3F3F46",
  borderRadius: "10px",
};

export default StrategyPanel;