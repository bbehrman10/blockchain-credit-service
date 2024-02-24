// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VendorExample is ERC721Enumerable, Ownable {
    uint256 private _currentTokenID = 0;

    constructor() ERC721("MyNFT", "mNFT") Ownable(msg.sender){}

    function mint(address to, uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        for (uint256 i = 0; i < amount; i++) {
            _currentTokenID += 1; // Increment the token ID before minting to ensure each NFT has a unique ID
            _mint(to, _currentTokenID); // Mint the new token
        }
    }
}
