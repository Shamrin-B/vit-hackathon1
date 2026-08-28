// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MockYieldVault is ERC20 {
    using SafeERC20 for IERC20;

    IERC20 public immutable asset;
    uint256 public constant APY_BPS = 500; // 5% APY
    uint256 public lastAccrualTimestamp;
    uint256 private _totalAssets;

    constructor(address _asset) ERC20("Mock Vault Share", "mvUSD") {
        asset = IERC20(_asset);
        lastAccrualTimestamp = block.timestamp;
    }

    function _accrueInterest() internal {
        uint256 timePassed = block.timestamp - lastAccrualTimestamp;
        if (timePassed > 0 && totalSupply() > 0) {
            uint256 interest = (_totalAssets * APY_BPS * timePassed) / (10000 * 365 days);
            _totalAssets += interest;
            lastAccrualTimestamp = block.timestamp;
        }
    }

    function deposit(uint256 amount) external returns (uint256 shares) {
        _accrueInterest();
        shares = totalSupply() == 0 ? amount : (amount * totalSupply()) / _totalAssets;
        _totalAssets += amount;

        asset.safeTransferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, shares);
    }

    function withdraw(uint256 shares) external returns (uint256 amount) {
        _accrueInterest();
        amount = (shares * _totalAssets) / totalSupply();
        _totalAssets -= amount;

        _burn(msg.sender, shares);
        asset.safeTransfer(msg.sender, amount);
    }

    function totalAssets() public view returns (uint256) {
        uint256 timePassed = block.timestamp - lastAccrualTimestamp;
        if (totalSupply() == 0) return _totalAssets;
        uint256 interest = (_totalAssets * APY_BPS * timePassed) / (10000 * 365 days);
        return _totalAssets + interest;
    }
}