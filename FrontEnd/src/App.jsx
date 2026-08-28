import { useState } from "react";
import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";
import YieldChart from "./components/YieldChart";
import StrategyPanel from "./components/StrategyPanel";
import ExecutionLog from "./components/ExecutionLog";
function App() {
  const [showStrategy, setShowStrategy] = useState(false);
  return (
    <div
      style={{
        background: "#0B0B0F",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <div
  style={{
    position: "fixed",
    top: "-150px",
    left: "-150px",
    width: "400px",
    height: "400px",
    background: "#8B5CF6",
    borderRadius: "50%",
    filter: "blur(180px)",
    opacity: 0.15,
    pointerEvents: "none",
  }}
/>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "calc(100vh - 80px)",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            color: "#8B5CF6",
            fontSize: "3rem",
            textAlign: "center",
          }}
        >
          Yield-Optimized DCA Engine
        </h1>

        <p>Uniswap v4 Hook Hackathon Project</p>

        <button
  onClick={() => setShowStrategy(!showStrategy)}
  style={{
    marginTop: "20px",
    padding: "12px 24px",
    background: "#8B5CF6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {showStrategy ? "Hide Strategy" : "Create Strategy"}
</button>
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
gap: "20px",
marginTop: "50px",
width: "100%",
maxWidth: "700px",
          }}
        >
          <StatsCard title="Total Deposited" value="$12,500" />
          <StatsCard title="Yield Earned" value="$482" />
          <StatsCard title="Next Execution" value="2d 4h" />
          <StatsCard title="Last Price" value="$3,245" />
        </div>

        {/* Yield Chart */}
        <YieldChart />

        {/* Strategy Panel */}
       {showStrategy && <StrategyPanel />}

        {/* Execution History */}
        <ExecutionLog />
      </div>
    </div>
  );
}

export default App;