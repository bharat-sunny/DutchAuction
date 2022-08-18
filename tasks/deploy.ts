import '@nomiclabs/hardhat-waffle';
import { upgrades } from 'hardhat';
import { task } from 'hardhat/config';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

task('deploy', 'Deploy Greeter contract').setAction(
  async (_, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const Greeter = await hre.ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, Hardhat!');

    await greeter.deployed();

    console.log('Greeter contract deployed to:', greeter.address);
    await upgrades.upgradeProxy(proxy.address, dutchAuctionContract.address);


    // const HuskyMint = await hre.ethers.getContractFactory('HuskyMint');
    // const minter = await HuskyMint.deploy();

    //
  }
);
