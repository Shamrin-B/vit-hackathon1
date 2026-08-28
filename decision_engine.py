from dataclasses import dataclass
from market_monitor import MarketSignal

@dataclass
class DCAStrategy:
    amount: float
    interval_seconds: int
    max_delay_seconds: int
    min_tranche_percent: int
    seconds_since_last_execution: int = 0

@dataclass
class ExecutionDecision:
    action: str
    tranche_percent: int
    reasoning: str

class DecisionEngine:
    def decide(self, strategy: DCAStrategy, signal: MarketSignal) -> ExecutionDecision:
        deadline_forced = strategy.seconds_since_last_execution >= (
            strategy.interval_seconds + strategy.max_delay_seconds
        )

        if deadline_forced:
            return ExecutionDecision(
                "EXECUTE_FULL", 100,
                "Max delay window exceeded — forcing execution regardless of market condition."
            )

        if signal.volatility_level == "HIGH" and signal.deviation_pct > 5:
            if strategy.seconds_since_last_execution < strategy.interval_seconds + strategy.max_delay_seconds:
                return ExecutionDecision(
                    "DELAY", 0,
                    f"High volatility ({signal.deviation_pct}% deviation) — delaying within allowed window."
                )
            return ExecutionDecision(
                "EXECUTE_PARTIAL", strategy.min_tranche_percent,
                "Volatility persists past delay window — executing minimum tranche only."
            )

        tranche = 100
        reasoning = "Normal market conditions — executing full amount."

        if signal.estimated_slippage_bps > 100:
            tranche = max(strategy.min_tranche_percent, tranche - 30)
            reasoning = f"Slippage {signal.estimated_slippage_bps}bps too high — reducing tranche by 30%."

        action = "EXECUTE_FULL" if tranche == 100 else "EXECUTE_PARTIAL"
        return ExecutionDecision(action, tranche, reasoning)