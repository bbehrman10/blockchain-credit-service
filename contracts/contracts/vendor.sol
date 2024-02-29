// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract VendorExample is ERC721Enumerable, Ownable {
    uint256 private _currentTokenID = 0;
    uint256 public mintPrice = 0.44 ether; // Set initial mint price
    event Mint(address indexed to, uint256 tokenId);

    mapping(uint256 => address) public tokenToHolder;

    constructor() ERC721("MyNFT", "mNFT") Ownable(msg.sender) {}

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function mint(address to, uint256 amount) public payable {
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value >= amount * mintPrice, "Insufficient funds sent");
        console.log("In the Minter");
        for (uint256 i = 0; i < amount; i++) {
            _currentTokenID += 1;
            _mint(to, _currentTokenID);
            tokenToHolder[_currentTokenID] = to;
            emit Mint(to, _currentTokenID);
        }
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Failed to send Ether");
    }

    // Ensure the contract can receive ETH
    receive() external payable {}

    fallback() external payable {}
}
