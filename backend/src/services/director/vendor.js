const axios = require('axios');
const vendorMgmt = require('../dataAccess/database/vendorMgmt');
const transactionMgmt = require('../dataAccess/database/transactionMgmt');
const creditMgmt = require('../dataAccess/database/creditMgmt');
const blockchain = require('../dataAccess/blockchain/blockchain');

exports.createVendor = async (vendorName, vendorEmail, vendorPassword, vendorDescription) => {
    const vendor = {
        Name: vendorName,
        Email: vendorEmail,
        Password: vendorPassword,
        Description: vendorDescription
    };
    console.log(vendorMgmt);
    try {
        const newVendor = await vendorMgmt.createVendor(vendor);
        return newVendor;
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
}

exports.getVendor = async (id) => {
    try {
        const vendor = await vendorMgmt.getVendor(id);
        return vendor;
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
}

exports.createVendorClient = async (description, contractAddress, functionSignature, functionName, whitelistedURL, vendorID) => {
    const vendorClient = {
        Description: description,
        ContractAddress: contractAddress,
        FunctionSignature: functionSignature,
        FunctionName: functionName,
        WhiteListedURL: whitelistedURL,
        VendorID: vendorID
    };
    try {
        const newVendorClient = await vendorMgmt.createVendorClient(vendorClient);
        return newVendorClient;
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
}

exports.getVendorClient = async (id) => {
    try {
        const vendorClient = await vendorMgmt.getVendorClient(id);
        return vendorClient;
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
}

exports.payVendor = async (cardID, clientID, activityAmount, activityDescription, functionInputs) => {
    try {
        const vendorClient = await vendorMgmt.getVendorClient(clientID);
        const newActivity = {
            cardID: cardID,
            clientID: clientID,
            amount: activityAmount,
            type: 'Purchase',
            description: activityDescription
        };
        const incompleteTx = await transactionMgmt.createCreditActivity(newActivity);
        const bchainTx = await blockchain.submitVendorTxToChain(vendorClient, functionInputs, activityAmount);
        // //convert crypto to USD function
        const usd = await convertEthToSD(activityAmount);
        const completeTx = await transactionMgmt.updateActivity(incompleteTx.ActivityID, bchainTx, usd);
        //push notification - quicknode alerts
        const updateCard = await creditMgmt.updateCardBalance(cardID, usd);
        return completeTx;
    } catch (error) {
        console.error('Error with processing transaction', error);
        throw error;
    }
}

convertEthToSD = async (eth) => {
    const response = await axios.get('https://api.diadata.org/v1/assetQuotation/Ethereum/0x0000000000000000000000000000000000000000');
    const usd = response.data.Price;
    return eth * usd;
}
