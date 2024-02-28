const vendorMgmt = require('../dataAccess/database/vendorMgmt');
const transactionMgmt = require('../dataAccess/database/transactionMgmt');
const { blockchain } = require('../dataAccess/blockchain/blockchain');

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

exports.createVendorClient = async (description, contractAddress, functionSignature, whitelistedURL, vendorID) => {
    const vendorClient = {
        Description: description,
        ContractAddress: contractAddress,
        FunctionSignature: functionSignature,
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

exports.payVendor = async (cardID, clientID, activityAmount, activityDescription) => {
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
        const bchainTID = await blockchain.purchase('0x343434', vendorClient.ContractAddress, vendorClient.FunctionSignature);
        const completeTx = await transactionMgmt.updateActivity(incompleteTx.ActivityID, bchainTID);
        return completeTx;
    } catch (error) {
        console.error('Error with processing transaction', error);
        throw error;
    }
}
