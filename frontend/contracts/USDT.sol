// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract USDT is ERC20, ERC20Permit, Ownable, Pausable {
  // Minter role for authorized entities to create new tokens
  mapping(address => bool) private _minters;

  // Blacklist to prevent transactions from/to certain addresses
  mapping(address => bool) private _blacklisted;

  // Constructor
  constructor() ERC20("USDT", "USDT") Ownable(msg.sender) ERC20Permit("USDT") {
    _mint(msg.sender, 10_000 * 10 ** decimals());
  }

  // Standard ERC20 Functions
  function totalSupply() public view override returns (uint256) {
    return super.totalSupply();
  }

  function balanceOf(address account) public view override returns (uint256) {
    return super.balanceOf(account);
  }

  function transfer(address recipient, uint256 amount) public override returns (bool) {
    _checkBlacklist(msg.sender, recipient);
    return super.transfer(recipient, amount);
  }

  function allowance(address owner, address spender) public view override returns (uint256) {
    return super.allowance(owner, spender);
  }

  function approve(address spender, uint256 amount) public override returns (bool) {
    return super.approve(spender, amount);
  }

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) public override returns (bool) {
    _checkBlacklist(sender, recipient);
    return super.transferFrom(sender, recipient, amount);
  }

  // USDT Specific Functions
  function mint(address to, uint256 amount) public onlyMinter {
    _mint(to, amount);
  }

  function burn(uint256 amount) public {
    _burn(msg.sender, amount);
  }

  // Minter Management
  function addMinter(address minter) public {
    _minters[minter] = true;
  }

  function isMinter(address account) public view returns (bool) {
    return _minters[account];
  }

  function removeMinter(address minter) public {
    _minters[minter] = false;
  }

  // Blacklist Management
  function blacklistAddress(address account) public {
    _blacklisted[account] = true;
  }

  function removeFromBlacklist(address account) public {
    _blacklisted[account] = false;
  }

  function isBlacklisted(address account) public view returns (bool) {
    return _blacklisted[account];
  }

  // Pause Mechanism
  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  // Internal function to check blacklist
  function _checkBlacklist(address sender, address recipient) internal view {
    require(!_blacklisted[sender], "Sender is blacklisted");
    require(!_blacklisted[recipient], "Recipient is blacklisted");
  }

  // Modifier for minter-only functions
  modifier onlyMinter() {
    require(_minters[msg.sender], "Not authorized to mint");
    _;
  }
}