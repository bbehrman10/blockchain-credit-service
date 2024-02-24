// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract bsc_main {

   event CallSuccess(bool success);

    function processVendorPayment(
        address vendorContract, 
        bytes4 vendorFunction, 
        bytes memory functionInputs
    ) 
        public 
    {
        // Combine the function identifier with the ABI-encoded inputs
        bytes memory callData = abi.encodePacked(vendorFunction, functionInputs);

        // Perform the call
        (bool success, ) = vendorContract.call(callData);

        // It's a good practice to check the call's success and react accordingly
        require(success, "Vendor payment failed");

        emit CallSuccess(success);
    }

    

}