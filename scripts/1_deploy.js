const hre = require("hardhat");

async function main() {
  console.log(`Preparing deployment...\n`)
  // fetch contracts
  const Token = await hre.ethers.getContractFactory('Token');
  const Exchange = await hre.ethers.getContractFactory('Exchange');

  //fetch accounts
  const accounts = await ethers.getSigners();

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`)

  // deploy contracts
  const depth = await Token.deploy('DEPTH', 'DEPTH', '1000000');
  await depth.deployed();
  console.log('DEPTH Deployed to:', depth.address);

  const mETH = await Token.deploy('mETH', 'mETH', '1000000');
  await mETH.deployed();
  console.log('mETH Deployed to:', mETH.address);

  const mDAI = await Token.deploy('mDAI', 'mDAI', '1000000');
  await mDAI.deployed();
  console.log('mDAI Deployed to:', mDAI.address);
  
  const exchange = await Exchange.deploy(accounts[1].address, 10);
  await exchange.deployed();
  console.log('Exchange Deployed to:', exchange.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});