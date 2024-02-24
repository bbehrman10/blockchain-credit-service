const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// Assuming BSC contract ABI includes callBSCVendor
const bscContract = new ethers.Contract(process.env.BSC_CONTRACT_ADDRESS, JSON.parse(process.env.BSC_CONTRACT_ABI), signer);

exports.processVendorTransaction = async ({ userAddress, vendorClient, functionInputs }) => {
    const functionSignature = vendorClient.functionSignature;
    const contractAddress = vendorClient.contractAddress;

    // Determine the correct selector for the function signature
    const selector = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(functionSignature)).substring(0, 10);

    // Assuming functionInputs is an array of arguments correctly ordered for the function call
    // You also need to know the types of these arguments to encode them properly
    // The types array ("argType1", "argType2", ...) needs to be dynamically determined based on the functionSignature
    // This is a critical step that depends on your application logic
    const argTypes = vendorClient.argTypes; // You need to have this information available
    const encodedArgs = ethers.utils.defaultAbiCoder.encode(argTypes, functionInputs);

    // Make the call to your BSC contract's callBSCVendor function
    // Ensure callBSCVendor is correctly implemented to handle the forwarded call
    const tx = await bscContract.callBSCVendor(contractAddress, selector, encodedArgs);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    
    return receipt; // Return transaction receipt
};
