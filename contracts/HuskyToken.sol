//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract HuskyToken is ERC721, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  constructor() ERC721('HuskToken', 'HSTK') {}

  function safeMint(address to) public returns (uint256) {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
    return tokenId;
  }
}
