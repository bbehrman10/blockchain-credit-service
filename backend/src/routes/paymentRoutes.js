const express = require('express');
const router = express.Router();
const director = require('../services/director');

router.post('/pay-vendor', async (req, res) => {
    const { cardID, clientID, Amount, functionInputs } = req.body;
    try {
        const vendorClient = await director.vendor.getVendorClient(clientID);
        const tx = await director.vendor.payVendor(cardID, clientID, Amount, "Purchase", functionInputs);
        res.status(200).send(tx);
    } catch (error) {
        res
            .status(500)
            .send('Error paying vendor');
    }
});

module.exports = router;