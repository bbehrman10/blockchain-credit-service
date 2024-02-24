const {ethers} = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, process.env.CONTRACT_ABI, signer); //not sure what the signer is for in this case, revisit this later

exports.processVendorTransaction = async({userAddress, vendorClient, functionInputs}) => {
    //unpack vendor client info
    const functionSignature = vendorClient.functionSignature;
    const contractAddress = vendorClient.contractAddress;

    // await imported contract and submit transaction containing contract address, function signature
    const transaction = await contract.VENDORTXPLACEHOLDER(contractAddress, functionSignature, functionInputs)

}