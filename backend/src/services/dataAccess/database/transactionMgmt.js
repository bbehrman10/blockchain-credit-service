const { CreditActivity } = require('../../../models');

exports.createCreditActivity = async (activity) => {
    try {
        const creditActivity = await CreditActivity.create({
            CardID: activity.cardID,
            VendorClientID: activity.clientID,
            Amount: activity.amount,
            Type: activity.type,
            Status: 'Incomplete'
        });
        return creditActivity;
    } catch (error) {
        console.error('Error creating credit activity', error);
        throw error;
    }
};

exports.getCreditActivity = async (cardID) => {
    try {
        const creditActivity = await CreditActivity.findAll({
            where: {
                CardID: cardID
            }
        });
        return creditActivity;
    } catch (error) {
        console.error('Error getting credit activity', error);
        throw error;
    }
};

exports.updateActivity = async (activityID, bchainId, usdEquiv) => {
    try {
        const [numUpdated, updatedCreditActivity] = await CreditActivity.update({
            Status: "Complete",
            BlockchainTransactionID: bchainId,
            USDEquivalent: usdEquiv
        }, {
            where: {
                ActivityID: activityID
            },
            returning: true // Include the updated record in the result
        });
        if (numUpdated === 0) {
            throw new Error('Credit activity not found');
        }
        return updatedCreditActivity[0]; // Return the updated credit activity
    } catch (error) {
        console.error('Error updating credit activity', error);
        throw error;
    }    
}
