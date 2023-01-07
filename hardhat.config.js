require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const goerliPrivateKeys = process.env.GOERLI_PRIVATE_KEY || "";
const berePrivateKeys = process.env.BERESHEET_PRIVATE_KEY || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: `http://127.0.0.1:8545/`,
      gas: 2100000,
      gasPrice: 8000000000,
      gasLimit: 100
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: goerliPrivateKeys.split(','),
      // accounts: [`0x${goerliPrivateKey}`],
    },
    beresheet: {
      url: `https://beresheet-evm.jelliedowl.net`,
      chainId: 2022,
      accounts: berePrivateKeys.split(','),
    },
  }
};
