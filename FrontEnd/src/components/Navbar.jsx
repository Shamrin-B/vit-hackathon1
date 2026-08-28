import { Wallet } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [connected, setConnected] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#111118",
        borderBottom: "1px solid #2a2a2a",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "#8B5CF6", margin: 0 }}>YieldDCA</h2>

      <button
        onClick={() => setConnected(!connected)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#8B5CF6",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        <Wallet size={18} />
        {connected ? "0xA3F...92E" : "Connect Wallet"}
      </button>
    </div>
  );
}

export default Navbar;