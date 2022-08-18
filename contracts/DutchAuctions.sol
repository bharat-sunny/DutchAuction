pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol"; // to use via getContractFactory()

contract DutchAuctions {

    // Required variables
    address payable addressOfOwner;
    address payable winnerAddress;
    uint256 reservePrice;
    uint256 numBlocksActionOpen;
    uint256 offerPriceDecrement;
    uint startBlockNumber;
    uint winningBidAmount;
    bool auctionEnded;
    bool confirmed;
    IERC20 public erc20TokenAddress;
    IERC721 public erc721TokenAddress;
    uint256 public nftTokenId;
  
    constructor (address _erc20TokenAddress, address _erc721TokenAddress, uint256 _nftTokenId, uint256 _reservePrice, uint256 _numBlocksAuctionOpen, uint256 _offerPriceDecrement) {
        // iniitialize everything to a variable
        erc20TokenAddress = IERC20(_erc20TokenAddress);
        erc721TokenAddress = IERC721(_erc721TokenAddress);
        nftTokenId = _nftTokenId; 
        reservePrice = _reservePrice;
        numBlocksActionOpen = _numBlocksAuctionOpen;
        offerPriceDecrement = _offerPriceDecrement;
        addressOfOwner = payable(msg.sender);
        startBlockNumber = block.number;
    }

    function bid(uint amount) external payable {

        // check if the auction has ended
        require(!auctionEnded);
        // check if the block number is within the time limit
        require(block.number < (startBlockNumber + numBlocksActionOpen));
        // check if the bid is higher than the reserve price
        require(amount >= (reservePrice + (offerPriceDecrement * (startBlockNumber + numBlocksActionOpen - block.number))), "Amount of eth sent is less than the price of the token");


        // if the bid value is higher end the auction
        auctionEnded = true;

        winnerAddress = payable(msg.sender);
        winningBidAmount = amount;

        erc20TokenAddress.approve(address(this),amount);
        erc20TokenAddress.transferFrom(msg.sender,address(this),amount);
        erc721TokenAddress.transferFrom(addressOfOwner, winnerAddress, nftTokenId);

    }

    function getPrice() view public returns(uint256) {
        uint256 price = reservePrice + (offerPriceDecrement * (startBlockNumber + numBlocksActionOpen - block.number));
        return price;
    }

    function getReservePrice() public view returns (uint256) {
    return reservePrice;
    }

  function getNumBlocksOpen() public view returns (uint256) {
    return numBlocksActionOpen;
  }

  function getOfferPriceDecrement() public view returns (uint256) {
    return offerPriceDecrement;
  }

  function getAddressOfOwner() public view returns (address) {
    return addressOfOwner;
  }

  function getWinnerAddress() public view returns (address) {
    return winnerAddress;
  }


    function getNounceValue() public view returns (uint256) {
      return nftTokenId;
    }

    function finalize() payable public{
        // using the finlalize to transfer the amount
        require(auctionEnded && !confirmed);
        require(msg.sender == winnerAddress);
        confirmed = true;
        addressOfOwner.transfer(winningBidAmount);
        // transfer nft here
        // erc20TokenAddress.transferFrom(addressOfOwner, msg.sender, winningBidAmount * 10 ** 18);
        // erc20TokenAddress.transfer(msg.sender, erc20TokenAddress.balanceOf(addressOfOwner));


    }



    function refund(uint256 refundAmount) public payable {
        // initiate the refund amount
        require(auctionEnded && !confirmed);
        confirmed = true;
        winnerAddress.transfer(refundAmount);
    }

    //for testing framework
    function nop() public returns(bool) {
        return true;
    }
}