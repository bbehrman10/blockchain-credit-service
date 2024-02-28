const  creditMgmt  = require('../dataAccess/database/creditMgmt');
const  creditCheck  = require('../external/creditCheck');

exports.creditCheck = async (creditForm) => {
    try {
        const creditCheck = await creditCheck.creditCheck(creditForm);
        return creditCheck;
    } catch (error) {
        console.error('Error with credit check', error);
        throw error;
    }
}

exports.createCard = async (userID) => { 
    try {
        const card = {
            creditLimit: 10000,
            expiryDate: '2026-02-28 06:05:44.849+00',
            userID: userID
        }
        const newCard = await creditMgmt.createCard(card);
        return card
    } catch (error) {
        console.error('Error creating card', error);
        throw error;
}
exports.getCards = async (UserID) => { 
    try {
        const cards = await creditMgmt.getCards(UserID);
        return cards;
    } catch (error) {
        console.error('Error fetching cards', error);
        throw error;
    }
 }

exports.getCreditActivity = async (cardID) => {
    try {
        const creditActivity = await creditMgmt.getCardActivity(cardID);
        return creditActivity;
    } catch (error) {
        console.error('Error getting credit activity', error);
        throw error;
    }

}

exports.createStatement = async (userID, cardID, statementDate, statementAmount) => {
    const statement = {
        userID: userID,
        cardID: cardID,
        statementDate: statementDate,
        statementAmount: statementAmount
    }
    try {
        const newStatement = await creditMgmt.createStatement(statement);
        return newStatement;
    } catch (error) {
        console.error('Error creating statement', error);
        throw error;
    }
}
exports.payStatement = async (statementID, paymentAmount) => {}
//doing statements later
}
