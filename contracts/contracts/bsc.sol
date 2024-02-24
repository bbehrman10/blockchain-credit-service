// SPDX LICENSE IDENTIFIER: TBD
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract bsc is Ownable {
    event BSCVendorCalled(address indexed vendorAddr, string functionSignature, bytes functionArgs, bool success, bytes data);
    constructor() Ownable(msg.sender) {}

     function callBSCVendor(address _vendorAddr, bytes4 _selector, bytes memory _functionArgs) public onlyOwner returns (bool, bytes memory) {
        // Prepare the call data by concatenating selector and encoded function arguments
        bytes memory callData = abi.encodePacked(_selector, _functionArgs);

        // Perform the low-level call
        (bool success, bytes memory data) = _vendorAddr.call(callData);

        require(success, "BSC call failed");

        emit BSCVendorCalled(_vendorAddr, _selector, _functionArgs, success, data);

        return (success, data);
    }
}