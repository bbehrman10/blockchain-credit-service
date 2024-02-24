// SPDX LICENSE IDENTIFIER: TBD
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract bsc is Ownable {
    constructor() Ownable(msg.sender) {}

    function callBSCVendor(address _vendorAddr, string memory _functionSignature, bytes memory _functionArgs) public onlyOwner returns (bool, bytes memory){
        //combine signature and arguments)
        bytes memory callData = abi.encodeWithSignature(_functionSignature, _functionArgs);
        (success, data) = _vendorAddr.call(callData);
        require (success, "BSC call failed");
        return (success, data);
    }
}