require('dotenv').config();
const contractABI  = require('./abi/BCS.json');
const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

exports.submitVendorTxToChain = async (vendorClient, functionInputs, activityAmount) => {
    const signer = new ethers.Wallet(process.env.SERVICE_PRIVATE_KEY, provider);
    const iface = new ethers.Interface([vendorClient.FunctionSignature]);
    const encodedFunctionCall = iface.encodeFunctionData(vendorClient.FunctionName, functionInputs);
    const bcsContract = new ethers.Contract(process.env.BCS_ADDRESS, contractABI.abi, signer);
    const amountInWei = ethers.parseEther(activityAmount.toString());
    // return "hash used for testing purposes";
    try {
        const bcsTx = await bcsContract.callBCSVendor(vendorClient.ContractAddress, encodedFunctionCall, amountInWei);
        return bcsTx.hash;
    } catch (error) {
        console.error("Error calling BCS contract:", error);
    }
}