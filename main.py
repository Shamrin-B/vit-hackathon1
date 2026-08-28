from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from market_monitor import MarketMonitor
from decision_engine import DecisionEngine, DCAStrategy
from vault_manager import VaultManager

app = FastAPI(title="DCA Engine Keeper")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

monitor = MarketMonitor()
engine = DecisionEngine()
vault = VaultManager()

execution_log = []

class StrategyIn(BaseModel):
    amount: float
    interval_seconds: int = 604800
    max_delay_seconds: int = 259200
    min_tranche_percent: int = 25
    seconds_since_last_execution: int = 0
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "DCA Engine Keeper API is running successfully!",
        "docs_url": "http://127.0.0.1:8000/docs"
    }
@app.get("/market")
def get_market():
    return monitor.get_signal().__dict__

@app.post("/execute")
def execute(strategy_in: StrategyIn):
    signal = monitor.get_signal()
    strategy = DCAStrategy(
        amount=strategy_in.amount,
        interval_seconds=strategy_in.interval_seconds,
        max_delay_seconds=strategy_in.max_delay_seconds,
        min_tranche_percent=strategy_in.min_tranche_percent,
        seconds_since_last_execution=strategy_in.seconds_since_last_execution,
    )
    decision = engine.decide(strategy, signal)

    executed_amount = 0.0
    if decision.action in ("EXECUTE_FULL", "EXECUTE_PARTIAL"):
        exec_amount = strategy.amount * (decision.tranche_percent / 100)
        executed_amount = vault.withdraw(exec_amount)

    result = {
        "market": signal.__dict__,
        "decision": decision.__dict__,
        "vault_value": round(vault.current_value(), 2),  # <--- Capturing value AFTER withdrawal!
        "executed_amount": round(executed_amount, 2),
    }
    execution_log.append(result)
    return result

@app.get("/log")
def get_log():
    return execution_log[-10:]

@app.post("/deposit")
def deposit(amount: float):
    return vault.deposit(amount).__dict__

@app.post("/reset")
def reset():
    global vault, execution_log
    vault = VaultManager()
    execution_log = []
    return {"status": "reset"}