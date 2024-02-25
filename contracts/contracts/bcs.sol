// SPDX-License-Identifier: TBD
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BCS is Ownable {
    // Adjusted event: Removed indexing from 'bytes' as it's not supported. Simplified for clarity.
    event VendorCalled(
        address indexed vendorAddr, 
        bool success, 
        bytes data
    );

    constructor() Ownable(msg.sender) {}

    // Function expects already encoded function call data, including the selector.
    function callBCSVendor(address vendorAddr, bytes calldata encodedFunctionCall) external onlyOwner {
        // Perform the low-level call using the encoded function call data.
        (bool success, bytes memory data) = vendorAddr.call(encodedFunctionCall);

        require(success, "BCS call failed");

        // Emit event with results. Removed the selector and functionArgs from the event to match updated parameters.
        emit VendorCalled(vendorAddr, success, data);
    }
}
