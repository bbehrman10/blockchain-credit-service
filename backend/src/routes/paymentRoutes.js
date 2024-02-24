const express = require('express');
const router = express.Router();
const { processVendorTransaction } = require('../services/blockchain');
const { getVendorDetails, getUserWallet } = require('../services/database');

router.post('/transaction', async (req, res) => {
    const { userId, vendorId, purchaseId, amount, denomination } = req.body;

    try {
        const vendorDetails = await getVendorDetails(vendorId, purchaseId);
        const userWallet = await getUserWallet(userId);

        const transactionReceipt = await processVendorTransaction({
            contractAddress: vendorDetails.contractAddress,
            functionData: vendorDetails.functionData, // Includes function signature and parameters
            fromAddress: userWallet.address,
            amount,
            denomination
        });

        // Update database and respond to the request
        res.json({ success: true, receipt: transactionReceipt });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Transaction failed" });
    }
});

module.exports = router;
