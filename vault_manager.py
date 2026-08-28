import time
from dataclasses import dataclass

@dataclass
class VaultState:
    total_deposited: float
    shares: float
    apy: float = 0.05
    deposited_at: float = time.time()

class VaultManager:
    def __init__(self):
        self.state = VaultState(total_deposited=0, shares=0)

    def deposit(self, amount: float):
        self.state.total_deposited += amount
        self.state.shares += amount
        self.state.deposited_at = time.time()
        return self.state

    def current_value(self) -> float:
        elapsed_days = (time.time() - self.state.deposited_at) / 86400
        return self.state.total_deposited * (1 + self.state.apy * elapsed_days / 365)

    def withdraw(self, amount: float) -> float:
        value = self.current_value()
        withdrawn = min(amount, value)
        self.state.total_deposited = max(0, value - withdrawn)
        self.state.shares = self.state.total_deposited
        return withdrawn