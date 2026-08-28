import random
import time
from dataclasses import dataclass

@dataclass
class MarketSignal:
    twap: float
    current_price: float
    deviation_pct: float
    volatility_level: str
    estimated_slippage_bps: int
    timestamp: float

class MarketMonitor:
    def __init__(self, base_price: float = 3000.0):
        self.base_price = base_price
        self._price_history = [base_price] * 30

    def _simulate_price_tick(self) -> float:
        move = random.uniform(-0.015, 0.015)
        new_price = self._price_history[-1] * (1 + move)
        self._price_history.append(new_price)
        self._price_history = self._price_history[-30:]
        return new_price

    def get_signal(self) -> MarketSignal:
        current_price = self._simulate_price_tick()
        twap = sum(self._price_history) / len(self._price_history)
        deviation_pct = abs(current_price - twap) / twap * 100

        changes = [
            (self._price_history[i] - self._price_history[i - 1]) / self._price_history[i - 1]
            for i in range(1, len(self._price_history))
        ]
        vol = (sum(c ** 2 for c in changes) / len(changes)) ** 0.5 * 100

        if vol < 0.5:
            volatility_level = "LOW"
        elif vol < 1.2:
            volatility_level = "MED"
        else:
            volatility_level = "HIGH"

        slippage_bps = int(deviation_pct * 15 + random.uniform(0, 5))

        return MarketSignal(
            twap=round(twap, 2),
            current_price=round(current_price, 2),
            deviation_pct=round(deviation_pct, 3),
            volatility_level=volatility_level,
            estimated_slippage_bps=slippage_bps,
            timestamp=time.time(),
        )