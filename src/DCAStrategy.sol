// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DCAStrategy is Ownable {
    struct Strategy {
        uint256 dcaAmount;
        uint256 interval;
        uint256 maxDelay;
        uint8 minExecutePercent;
        uint256 lastExecuted;
    }

    mapping(address => Strategy) public userStrategies;

    event StrategySet(address indexed user, uint256 dcaAmount, uint256 interval);

    constructor() Ownable(msg.sender) {}

    function setStrategy(
        uint256 dcaAmount,
        uint256 interval,
        uint256 maxDelay,
        uint8 minExecutePercent
    ) external {
        require(interval > 0, "Invalid interval");
        require(minExecutePercent <= 100, "Invalid percent");

        userStrategies[msg.sender] = Strategy({
            dcaAmount: dcaAmount,
            interval: interval,
            maxDelay: maxDelay,
            minExecutePercent: minExecutePercent,
            lastExecuted: block.timestamp
        });

        emit StrategySet(msg.sender, dcaAmount, interval);
    }

    function getScheduledAmount(address user) public view returns (uint256) {
        Strategy memory strat = userStrategies[user];
        if (strat.interval == 0 || strat.dcaAmount == 0) return 0;

        uint256 timeElapsed = block.timestamp - strat.lastExecuted;
        if (timeElapsed < strat.interval) return 0;

        if (timeElapsed > strat.interval + strat.maxDelay) {
            return (strat.dcaAmount * strat.minExecutePercent) / 100;
        }

        return strat.dcaAmount;
    }

    function updateLastExecuted(address user) external onlyOwner {
        userStrategies[user].lastExecuted = block.timestamp;
    }
}