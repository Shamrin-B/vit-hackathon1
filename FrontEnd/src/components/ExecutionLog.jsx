const logs = [
  { date: "Aug 25", amount: "100 USDC", status: "Full" },
  { date: "Aug 18", amount: "50 USDC", status: "Partial" },
  { date: "Aug 11", amount: "-", status: "Delayed" },
];

function ExecutionLog() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        marginTop: "50px",
        padding: "25px",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "24px",
        border: "1px solid rgba(139,92,246,0.3)",
      }}
    >
      <h2 style={{ color: "#8B5CF6" }}>Recent Executions</h2>

      <table style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.amount}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExecutionLog;