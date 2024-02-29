// SPDX-License-Identifier: TBD
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./bcsVault.sol";
import "hardhat/console.sol";

contract BCS is Ownable {
    VaultInterface private bcsVault;

    event VaultUpdated(address indexed newVault);
    // event VendorCalled(address indexed vendorAddr, bool success, bytes data);

    constructor(address _bcsVault) Ownable(msg.sender) {
        updateVault(_bcsVault); // Initialize the vault using the update function for consistency
    }

    function updateVault(address _newVault) public onlyOwner {
        require(_newVault != address(0), "Vault address cannot be zero");
        require(_newVault != address(bcsVault), "Vault address is already set to this address");
        bcsVault = VaultInterface(_newVault);
        emit VaultUpdated(_newVault);
    }

    function callBCSVendor(address payable vendorAddr, bytes calldata encodedFunctionCall, uint256 paymentAmount) external onlyOwner {
        require (paymentAmount > 0, "Payment amount must be greater than 0");
        bcsVault.callBCSVendor(vendorAddr, encodedFunctionCall, paymentAmount);        
    }
}

