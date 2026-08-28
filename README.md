# DCA Engine Keeper 🚀

An automated, intelligent **Dollar-Cost Averaging (DCA)** execution engine built for decentralized finance. This system combines dynamic market signals, flexible execution decision logic, vault balance management, and smart contract integration to execute automated strategy trades while shielding users from market volatility.

---

## 🏗 System Architecture & Technical Flow

```text
[ React Frontend ] ──(HTTP JSON)──> [ FastAPI Backend ] ──(Web3 / RPC)──> [ EVM Blockchain / Smart Contracts ]
 (Strategy Panel & UI)            (Decision Engine & API)                   (DCA Hooks & Yield Vaults)
The system operates across three interconnected layers:

Frontend Tier: Provides a dynamic React interface for users to set up trading pairs, configure execution frequencies/delays, make vault deposits, and monitor transaction logs.

Backend Tier: Serves as the keeper bot/orchestration layer. It continuously fetches market indicators (MarketMonitor), evaluates trading strategies (DecisionEngine), manages user balances (VaultManager), and exposes RESTful API endpoints.

Blockchain Tier: Houses on-chain Solidity contracts that handle trustless vault storage, yield generation, and customized hook-based trade execution logic on EVM networks.

💻 Tech Stack & Dependencies
Frontend: React.js, Vite, JavaScript (ES6+), CSS Modules / Inline Styles

Backend: Python 3.10+, FastAPI, Uvicorn (ASGI server), Pydantic

Blockchain: Solidity, Foundry (Forge, Anvil), Ethers.js / Web3.py

🔍 In-Depth Architecture Breakdown
1. 🎨 Frontend (/FrontEnd)
StrategyPanel.jsx: Main form component where users configure DCA parameters (Token Pair, Amount, Frequency, Max Delay Range). Sends structured POST payloads to the backend engine upon submission.

Navbar.jsx: Handles vault connectivity and triggers initial wallet/vault setup calls (POST /deposit).

backend.js: Centralized API configuration file exporting BASE_URL to route requests across network environments.

2. ⚙️ Backend & Decision Engine (Root Directory)
main.py: Entry point for the FastAPI server. Sets up CORS middleware, defines API schemas via Pydantic (DepositRequest, StrategyIn), and exposes operational endpoints.

decision_engine.py: Contains core decision logic (DecisionEngine, DCAStrategy). Analyzes market conditions against user parameters to output actions (EXECUTE_FULL, EXECUTE_PARTIAL, WAIT) and tranche percentages.

market_monitor.py: Synthesizes price and volatility indicators to generate live market signals.

vault_manager.py: Tracks account balances, processes deposits, executes withdrawals, and returns updated vault states post-trade.

3. ⛓️ Blockchain & Smart Contracts (/src)
DCAHook.sol: Modular hook implementation that triggers automated actions before or after strategy execution.

DCAStrategy.sol: Smart contract encapsulating on-chain DCA rules, user allocations, and recurring schedule state.

MockYieldVault.sol: Liquidity vault simulating yield-bearing strategies for deposited assets prior to trade execution.

📁 Repository Directory Structure
Plaintext
├── FrontEnd/                 # React frontend application
│   ├── src/
│   │   ├── api/
│   │   │   └── backend.js    # Centralized backend URL definition
│   │   ├── components/       # UI Components (StrategyPanel, Navbar, Cards)
│   │   └── pages/            # View pages (Dashboard, Market, History)
│   └── package.json
├── src/                      # Solidity smart contracts
│   ├── DCAHook.sol           # On-chain hook interface/logic
│   ├── DCAStrategy.sol       # Core DCA smart contract strategy
│   └── MockYieldVault.sol    # Yield vault mock contract
├── main.py                   # FastAPI application & endpoints controller
├── market_monitor.py         # Real-time market signal monitor
├── decision_engine.py        # Core DCA execution algorithm logic
├── vault_manager.py          # On-chain/off-chain vault manager
├── foundry.toml              # Foundry project configuration
└── requirements.txt          # Python virtual environment dependencies
⚡ Setup & Installation Guide
Prerequisites
Node.js: v18+ & npm

Python: v3.10+ & pip

Foundry: forge & anvil (For smart contract compilation/deployment)

1. Backend Setup (FastAPI)
Clone the repository:

PowerShell
git clone [https://github.com/YourUsername/YourRepoName.git](https://github.com/YourUsername/YourRepoName.git)
cd YourRepoName
Create and activate a virtual environment:

PowerShell
python -m venv venv
.\venv\Scripts\activate      # Windows
# source venv/bin/activate   # macOS/Linux
Install dependencies:

PowerShell
pip install -r requirements.txt
Run the FastAPI server:

PowerShell
uvicorn main:app --host 0.0.0.0 --port 8000
Interactive API documentation (Swagger UI): http://localhost:8000/docs

2. Frontend Setup (React)
Navigate to the frontend directory:

PowerShell
cd FrontEnd
Install Node dependencies:

PowerShell
npm install
Configure API base URL:
Open src/api/backend.js and set the target backend address:

JavaScript
const BASE_URL = "http://localhost:8000";
export default BASE_URL;
Launch the development server:

PowerShell
npm run dev
3. Smart Contracts Setup (Foundry)
Compile contracts:

PowerShell
forge build
Run smart contract tests:

PowerShell
forge test
Deploy to a local Ethereum node (Anvil):

PowerShell
# Terminal 1: Start local node
anvil


⚙ Core Operational Workflow
Vault Initialization (POST /deposit): Capital (e.g., 1000 USDC) is deposited into the vault balance via the interface or backend endpoint.

Strategy Setup (StrategyPanel): The user selects token pairs, allocation size, frequency, and maximum execution delay.

Signal Evaluation (DecisionEngine): MarketMonitor feeds live indicators to DecisionEngine, which computes market risk to output EXECUTE_FULL, EXECUTE_PARTIAL, or WAIT.

Execution & Audit (POST /execute & GET /log): On execution, funds are allocated from VaultManager and logged to the execution audit history in real-time.

