pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract HuskyMint is ERC721, Ownable {
  // Updating the token id
  uint256 tokenId = 1;

  // Using the constructor to initialize the contract
  constructor() ERC721('HuskyToken', 'HSKY') {}

  // Using the mint function to deploy the token
  function mintt() public payable returns (uint256 tokenId) {
    _safeMint(msg.sender, tokenId);
  }
}
