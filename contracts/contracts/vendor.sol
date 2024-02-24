// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VendorExample is ERC721Enumerable, Ownable {
    uint256 private _currentTokenID = 0;

    constructor() ERC721("MyNFT", "mNFT") Ownable(msg.sender){}

    function mint(address to) public {
        _currentTokenID += 1; // Increment the token ID
        _mint(to, _currentTokenID); // Mint the new token
    }
}
