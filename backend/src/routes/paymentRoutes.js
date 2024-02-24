const express = require('express');
const router = express.Router();
const { processVendorTransaction } = require('../services/blockchain');
const { retreiveVendorClientInfo } = require('../services/vendors');

router.post('/transaction', async (req, res) => {
    const { userAddress, clientId, functionInputs } = req.body;
    //check if vendor client ID is valid
    try {
        const vendorClient = await retreiveVendorClientInfo(clientId);
        if (!vendorClient) {
            return res.status(404).json({ success: false, message: "client and vendor id don't match" });
        }
        //check if requesting url matches vendor client url
        // if (req.get('origin') !== vendorClient.whiteListedUrl) {
        //     return res.status(403).json({ success: false, message: "request origin does not match client url" });
        // }
    } catch (error){
        console.error(error);
        return res.status(400).json({ success: false, message: "cannot connect to backend" });
    }
    
    //submit payment
    try {
        const transactionReceipt = await processVendorTransaction({
            vendorClient,
            userAddress,
            functionInputs
        });

        // Update database and respond to the request
        res.json({ success: true, receipt: transactionReceipt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Transaction failed" });
    }
});

module.exports = router;
