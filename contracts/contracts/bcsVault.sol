// SPDX-License-Identifier: TBD
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";

interface VaultInterface {
    function callBCSVendor(address payable vendorAddr, bytes calldata encodedFunctionCall, uint256 paymentAmount) external;
}

contract BCSVault is Ownable, VaultInterface{
    address private bcsContract;

    constructor() Ownable(msg.sender) {
    }

    function setBCSContract(address _bcsContract) external onlyOwner {
    require(_bcsContract != address(0), "BCS contract address cannot be zero.");
    bcsContract = _bcsContract;
}
    // function sendFunds(address payable recipient, uint256 amount) external {
    //     require(msg.sender == bcsContract, "Unauthorized");
    //     require(address(this).balance >= amount, "Insufficient funds");

    //     (bool success, ) = recipient.call{value: amount}("");
    //     require(success, "Failed to send Ether");
    // }

    function callBCSVendor(address payable vendorAddr, bytes calldata encodedFunctionCall, uint256 paymentAmount) external {
            require(msg.sender == bcsContract, "Unauthorized");
            require(address(this).balance >= paymentAmount, "Insufficient funds");
            (bool success, bytes memory data) = vendorAddr.call{value: paymentAmount}(encodedFunctionCall);
            require(success, "Vendor call failed");
    }

    // Function to receive ETH
    receive() external payable {}

    // Fallback function to receive ETH
    fallback() external payable {}
}
