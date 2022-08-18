import { useWeb3React, Web3ReactProvider } from '@web3-react/core';


import { Contract, ethers, Signer, utils } from 'ethers';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';
import HuskyArtifact from '../artifacts/contracts/HuskyToken.sol/HuskyToken.json';
import ERC20Artifact from '../artifacts/contracts/erc20.sol/HuskyERC.json';
import DutchAuctionArtifact from '../artifacts/contracts/DutchAuctions.sol/DutchAuctions.json';
import ProxyAuctionArtifact from '../artifacts/contracts/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json';
import { Provider } from '../utils/provider';
const StyledDeployContractButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;
const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;
const StyledLabel = styled.label`
  font-weight: bold;
`;
const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;
const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;
export function Greeter(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library, active } = context;
  const [signer, setSigner] = useState<Signer>();
  const [greeterContract, setGreeterContract] = useState<Contract>();
  
  const [dutchAuctionContract, setDutchAuctionContract] = useState<Contract>();
  const [dutchAuctionContractAddress, setDutchAuctionContractAddress] = useState<string>();


  const [erc20Contracts, setErc20Contracts] = useState<Contract>();
  const [huskyContract, setHuskyContract] = useState<Contract>();
  const [greeterContractAddr, setGreeterContractAddr] = useState<string>('');
  const [huskyContractAddr, setHuskyContractAddr] = useState<string>('');
  const [erc20ContractAddr, setERC20ContractAddr] = useState<string>();
  
  const [nftId, setNFTId] = useState<string>('');
  const [reservePriceInput, setReservePriceInput] = useState<string>('');
  const [numberOfBlockInput, setNumberOfBlockInput] = useState<string>('');
  const [offerPriceDecrementInput, setOfferPriceDecrementInput] =
    useState<string>('');
  const [totalNumberOfTokenInput, setTotalNumberOfTokenInput] =
    useState<string>('');
  const [bidAmountInput, setBidAmountInput] = useState<string>('');
  const [auctionWinner, setAuctionWinner] = useState<string>('');
  const [creationPrice, setCreationPrice] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [ actualDutchAuctionContractAddress, setActualDutchAuctionContractAddress ] = useState<string>('');
  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }
    setSigner(library.getSigner());
  }, [library]);


  function handleDeployContract(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // only deploy the Greeter contract one time, when a signer is defined
    if (!signer) {
      window.alert('No Signer.');
      console.log('No Signer.');
      return;
    }
    async function deployGreeterContract(signer: Signer): Promise<void> {

      const HuskyMint = new ethers.ContractFactory(
        HuskyArtifact.abi,
        HuskyArtifact.bytecode,
        signer
      );
      const ERC20 = new ethers.ContractFactory(
        ERC20Artifact.abi,
        ERC20Artifact.bytecode,
        signer
      );
      const DutchAuction = new ethers.ContractFactory(
        DutchAuctionArtifact.abi,
        DutchAuctionArtifact.bytecode,
        signer
      );
      const ProxyFactory = new ethers.ContractFactory(
        ProxyAuctionArtifact.abi,
        ProxyAuctionArtifact.bytecode,
        signer
      );
      try {

        const erc20Contract = await ERC20.deploy(100000);
        await erc20Contract.deployed();
        erc20Contract.transfer(
          '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
          100000
        );
        erc20Contract.transfer(
          '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
          100000
        );
        setErc20Contracts(erc20Contract);
        const huskyContract = await HuskyMint.deploy();
        await huskyContract.deployed();
        const testing = await huskyContract.safeMint(signer.getAddress());


        setNFTId(testing.chainId);
        console.log(testing.chainId);

   
        // console.log(testing);
        console.log('NFT Token ID: ' + testing.v);
        console.log(typeof(testing.v));
        console.log("NFFT ID"+ nftId);
        console.log(typeof(nftId));

        setHuskyContract(huskyContract);
        // // Minting ERC 20

        setERC20ContractAddr(erc20Contract.address);
        setHuskyContractAddr(huskyContract.address);
        const dutchAuctionContract = await DutchAuction.deploy(
          erc20Contract.address,
          huskyContract.address,
          testing.v,
          reservePriceInput,
          numberOfBlockInput,
          offerPriceDecrementInput
        );

        await dutchAuctionContract.deployed();
        setActualDutchAuctionContractAddress(dutchAuctionContract.address);

        console.log(
          'Actual Dutch Auction address',
          dutchAuctionContract.address
        );

        huskyContract.approve(dutchAuctionContract.address, testing.chainId);
        setDutchAuctionContractAddress(dutchAuctionContract.address);
        setDutchAuctionContract(dutchAuctionContract);
        

        const creationBlock = await dutchAuctionContract.getPrice();
        const owner = await dutchAuctionContract.getAddressOfOwner();
        setCreationPrice(creationBlock.toString());
        setOwner(owner);


        window.alert(
          'Dutch Auction deployed to: ' + dutchAuctionContract.address
        );
        // setGreeterContractAddr(greeterContract.address);
        setDutchAuctionContractAddress(dutchAuctionContract.address);
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.data.message}` : '')
        );
      }
    }
    deployGreeterContract(signer);
  }


  function handleReservePriceChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    event.preventDefault();
    setReservePriceInput(event.target.value);
  }
  function handleNumberOfBlockOpenChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    event.preventDefault();
    setNumberOfBlockInput(event.target.value);
  }
  function handleOfferPriceDecrementChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    event.preventDefault();
    setOfferPriceDecrementInput(event.target.value);
  }
  function handleTotalTokens(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setTotalNumberOfTokenInput(event.target.value);
  }

  function handleBidAmountInput(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setBidAmountInput(event.target.value);
  }
  async function handleGreetingSubmit(
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();

    if (!signer) {
      window.alert('No Signer.');
      return;
    }

    if (owner === (await signer.getAddress())) {
      window.alert('Owner cant bid.');
      return;
    }
 
    if (!reservePriceInput) {
      window.alert('Reserve price cannot be empty');
      return;
    }
    if (!numberOfBlockInput) {
      window.alert('Number of blocks cannot be empty');
      return;
    }
    if (!offerPriceDecrementInput) {
      window.alert('Offer price decrement cannot be empty');
      return;
    }

    if (!dutchAuctionContract){
      window.alert('Contract Missin');
      return;
    }



    async function submitGreeting(
      signer: Signer,
      dutchAuctionContract: Contract
    ): Promise<void> 
    {
      try {
        if (!erc20Contracts) {
          return;
        }
      
        await erc20Contracts.approve(
          dutchAuctionContractAddress,
          bidAmountInput
        );
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.data.message}` : '')
        );
      }

      try {
        try {
          const bid = await dutchAuctionContract
            .connect(signer)
            .bid(bidAmountInput);
          
          await bid.wait();
          
        } catch (error: any) {
          window.alert(
            'Error! New' +
              (error && error.message ? `\n\n${error.data.message}` : '')
          );
        }
        setAuctionWinner(await dutchAuctionContract.getWinnerAddress());
      } catch (error: any) {
        window.alert('Error! old' + (error && error.message ? `\n\n${error.data.message}` : '')
        );
      }
    }

    submitGreeting(signer, dutchAuctionContract);
  }



  return (
    <>
      <div className="flex flex-row ">
        <div
          className=" flex flex-1 justify-center items-center
    bg-gradient-to-br from-purple-700 to-amber-700"
        >
          <form
            className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
            action=""
          >
            <h1 className="text-center text-3xl">Dutch Auction</h1>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                ERC721 Address
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder=""
                name="email"
                id="erc721"
                value={
                  erc20ContractAddr
                    ? erc20ContractAddr
                    : `<Contract not yet deployed>`
                }
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                ERC20 Address
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="0x00000000000000000"
                name="password"
                id="password"
                value={
                  huskyContractAddr
                    ? huskyContractAddr
                    : `<Contract not yet deployed>`
                }
              />
            </div>

            {/* <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Token ID
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="1"
                name="pasword"
                id="password"
                value={nftId ? nftId : `<NFT is not minted yet>`}
              />
            </div> */}

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Reverse Price
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="1"
                onChange={handleReservePriceChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Number of blocks open for auction
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="1000"
                onChange={handleNumberOfBlockOpenChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Offer price decrement
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="20"
                onChange={handleOfferPriceDecrementChange}
              />
            </div>
            {/* <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Total number of tokens
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="1200"
                onChange={handleTotalTokens}
              />
            </div> */}
            <button
              className="w-full px-10 py-2 bg-buttonColor text-white   rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
              type="submit"
              disabled={!active || dutchAuctionContract ? true : false}
              style={{
                cursor:
                  !active || dutchAuctionContract ? 'not-allowed' : 'pointer',
                borderColor: !active || dutchAuctionContract ? 'unset' : 'blue'
              }}
              onClick={handleDeployContract}
            >
              Deploy DutchAuction Contract
            </button>
          </form>
        </div>
        <div
          className=" flex flex-1 justify-center items-center
    bg-gradient-to-br from-purple-700 to-amber-700"
        >
          <form
            className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
            action=""
          >
            <h1 className="text-center text-3xl">Bidding For The Contracts</h1>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Dutch Contract Address
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="text"
                placeholder="0x00000000000000000"
                name="email"
                id="erc721"
                value={
                  dutchAuctionContractAddress
                    ? dutchAuctionContractAddress
                    : `<Contract not yet deployed>`
                }
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Creation Block Price
              </label>
              {creationPrice ? creationPrice : `<Deploy your contract>`}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Amount of bid
              </label>
              <input
                className="w-96 px-3 py-2 rounded-md border border-slate-400"
                type="number"
                placeholder="Enter bid amount"
                name="number"
                id="bid_amount"
                onChange={handleBidAmountInput}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Auction Winner
              </label>
              {auctionWinner ? auctionWinner : `<No winner yet>`}
            </div>
            <button
              className="w-full px-10 py-2 bg-buttonColor text-white   rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
              type="submit"
              onClick={handleGreetingSubmit}
            >
              Submit Bid
            </button>
            {/* <button
              className="w-full px-10 py-2 bg-buttonColor text-white   rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
              type="submit"
              onClick={handleSellNFT}
            >
              Sell NFT
            </button>
            <button
              className="w-full px-10 py-2 bg-buttonColor text-white   rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
              type="submit"
              onClick={showOwner}
            >
              Owner of the NFT
            </button> */}
          </form>
        </div>
      </div>
    </>
  );
}