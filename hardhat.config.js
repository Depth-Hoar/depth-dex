require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

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
  }
};
