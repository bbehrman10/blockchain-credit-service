require("@nomicfoundation/hardhat-toolbox");
require ('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [process.env.SERVICE_PRIVATE_KEY, process.env.VENDOR_PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  }
};
