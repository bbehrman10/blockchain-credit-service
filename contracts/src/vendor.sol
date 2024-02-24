// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mintNFT(address to) public {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached"); // Optional: Limit total supply

         _tokenIdCounter.increment();
         uint256 tokenId = _tokenIdCounter.current();
        _mint(to, tokenId);
    }

}
