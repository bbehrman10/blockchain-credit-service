const express = require('express');
const router = express.Router();
const director = require('../services/director');

// User Pays Vendor using BCS Pay 
router.post('/payVendor', async (req, res) => {
    const { userID, vendorID, amount, cardID, statementID, clientID, activityDate, activityDescription } = req.body;
    try {
        await director.createCreditActivity(cardID, statementID, clientID, activityDate, amount, activityDescription);
        res.status(200).send('Payment Successful');
    } catch (error) {
        console.error('Error with payment', error);
        res.status(500).send('Error with payment');
    }
});

// User Pays BCS Statement using Crypto or Fiat
router.post('/payStatement', async (req, res) => {
    const { statementID, paymentAmount } = req.body;
    try {
        await director.payments.payStatement(statementID, paymentAmount);
        res.status(200).send('Payment Successful');
    } catch (error) {
        console.error('Error with payment', error);
        res.status(500).send('Error with payment');
    }
});




module.exports = router;
