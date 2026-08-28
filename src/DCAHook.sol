// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {DCAStrategy} from "./DCAStrategy.sol";

contract DCAHook {
    DCAStrategy public immutable dcaStrategy;
    bool public isVolatile;

    enum Action { Delay, ExecutePartial, ExecuteFull }

    event DCAExecutionDecision(address indexed user, Action action, uint256 amount);

    constructor(address _dcaStrategy) {
        dcaStrategy = DCAStrategy(_dcaStrategy);
    }

    function setVolatilityFlag(bool _isVolatile) external {
        isVolatile = _isVolatile;
    }

    function checkAndExecute(address user) external returns (Action action, uint256 executedAmount) {
        uint256 scheduledAmount = dcaStrategy.getScheduledAmount(user);

        if (scheduledAmount == 0) {
            emit DCAExecutionDecision(user, Action.Delay, 0);
            return (Action.Delay, 0);
        }

        if (isVolatile) {
            executedAmount = scheduledAmount / 2;
            emit DCAExecutionDecision(user, Action.ExecutePartial, executedAmount);
            action = Action.ExecutePartial;
        } else {
            executedAmount = scheduledAmount;
            emit DCAExecutionDecision(user, Action.ExecuteFull, executedAmount);
            action = Action.ExecuteFull;
        }

        dcaStrategy.updateLastExecuted(user);
    }
}