// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Test.sol";
import "../src/DCAStrategy.sol";
import "../src/MockYieldVault.sol";
import "../src/DCAHook.sol";

contract DCAHookTest is Test {
    DCAStrategy strategy;
    DCAHook hook;
    address user = address(0x123);

    function setUp() public {
        strategy = new DCAStrategy();
        hook = new DCAHook(address(strategy));

        vm.startPrank(user);
        strategy.setStrategy(100e18, 1 days, 2 days, 50);
        vm.stopPrank();
    }

    function test_ScheduledAmount() public view {
        assertEq(strategy.getScheduledAmount(user), 0);
    }
}