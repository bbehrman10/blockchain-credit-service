// const { ethers } = require('ethers');
// const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// // Assuming BSC contract ABI includes callBSCVendor
// const bscContract = new ethers.Contract(process.env.BSC_CONTRACT_ADDRESS, JSON.parse(process.env.BSC_CONTRACT_ABI), signer);

// exports.processVendorTransaction = async ({ userAddress, vendorClient, functionInputs }) => {
//     const functionSignature = vendorClient.functionSignature;
//     const contractAddress = vendorClient.contractAddress;

//     const iface = new ethers.Interface([functionSignature]);
//     const encodedFunctionCall = iface.encodeFunctionData(functionSignature, functionInputs);

//     const bcsTx = await bscContract.callBSCVendor(contractAddress, encodedFunctionCall);
//     const bcsTxReceipt = await bcsTx.wait();
//     // needs error handling
//     //also onced finished we need to return the transaction data back so we can store it\

//     //return tx id
// };
