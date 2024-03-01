require('dotenv').config();
const contractABI  = require('./abi/BCS.json');
const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider("https://sepolia.base.org");

exports.submitVendorTxToChain = async (vendorClient, functionInputs, activityAmount) => {
    const signer = new ethers.Wallet('SERVICE PRIVATE KEY GOES HERE', provider);
    const iface = new ethers.Interface([vendorClient.FunctionSignature]);
    const encodedFunctionCall = iface.encodeFunctionData(vendorClient.FunctionName, functionInputs);
    const bcsContract = new ethers.Contract("0x73fb9660FB320F01acDB5873D6fe10a03439594f", contractABI.abi, signer);
    const amountInWei = ethers.parseEther(activityAmount.toString());
    // return "hash used for testing purposes";
    try {
        const bcsTx = await bcsContract.callBCSVendor(vendorClient.ContractAddress, encodedFunctionCall, amountInWei);
        return bcsTx.transactionHash;
    } catch (error) {
        console.error("Error calling BCS contract:", error);
    }
}