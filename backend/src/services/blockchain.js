const {ethers} = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

exports.processVendorTransaction = async({}) => {

}