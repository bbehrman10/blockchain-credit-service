const { Card, Statement, sequelize} = require('../../models');

exports.createCard = async (creditLimit, expiryDate, userID) => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Error with connection', error);
        throw error;
    }
    const card = await Card.create({
        UserID: userID,
        CreditLimit: creditLimit,
        ExpiryDate: expiryDate,
        IsActive: true
    });
    return card;
};

exports.getCards = async (UserID) => {};

exports.updateCard = async (cardID, creditLimit, expiryDate, isActive) => {};

exports.createStatement = async (userID, cardID, statementDate, statementAmount) => {};

exports.payStatement = async (statementID, paymentAmount) => {};

exports.getLatestStatement = async (cardID) => {};





