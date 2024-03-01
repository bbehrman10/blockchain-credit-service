const { Vendor, VendorClient, Card, Statement, sequelize, CreditActivity } = require('../../../models');

exports.createCard = async (cardData) => {
    try {
        await sequelize.authenticate();
        const { creditLimit, expiryDate, userID } = cardData;
        const card = await Card.create({
            UserID: userID,
            CreditLimit: creditLimit,
            ExpiryDate: expiryDate,
            IsActive: true
        });
        return card;
    } catch (error) {
        console.error('Error creating card', error);
        throw error;
    }
};

exports.getCards = async ( userID ) => {
    try {
        await sequelize.authenticate();
        const cards = await Card.findAll({
            where: { UserID: userID }
        });
        return cards;
    } catch (error) {
        console.error('Error fetching cards', error);
        throw error;
    }
};

exports.getCard = async ( cardID ) => {
    try {
        await sequelize.authenticate();
        const card = await Card.findOne({
            where: { CardID: cardID }
        });
        return card;
    } catch (error) {
        console.error('Error fetching card', error);
        throw error;
    }  
};

exports.updateCard = async (cardData) => {
    try {
        await sequelize.authenticate();
        const { cardID, creditLimit, expiryDate, isActive } = cardData;
        const [updatedCount] = await Card.update({
            CreditLimit: creditLimit,
            ExpiryDate: expiryDate,
            IsActive: isActive
        }, {
            where: { CardID: cardID }
        });
        return updatedCount > 0;
    } catch (error) {
        console.error('Error updating card', error);
        throw error;
    }
};

exports.updateCardBalance = async (cardID, amount) => {
    try{
        await sequelize.authenticate();
        const card = await Card.findOne({
            where: { CardID: cardID }
        });
        const current = parseFloat(card.CurrentBalance);
        const newBalance = current + parseFloat(amount);
        card.CurrentBalance = newBalance;
         await card.save();
        return card;
    
    } catch (error) {
        console.error('Error updating card balance', error);
        throw error;
    }
}

exports.createStatement = async (statementData) => {
    try {
        await sequelize.authenticate();
        const { userID, cardID, statementDate, statementAmount } = statementData;
        const statement = await Statement.create({
            UserID: userID,
            CardID: cardID,
            StatementDate: statementDate,
            StatementAmount: statementAmount
        });
        return statement;
    } catch (error) {
        console.error('Error creating statement', error);
        throw error;
    }
};

exports.getCardActivity = async ( cardID ) => {
    try {
        await sequelize.authenticate();
        const transactions = await CreditActivity.findAll({
            where: { CardID: cardID },
            include: {
                model: VendorClient, 
                as: 'vendorClient',
                include: {
                    model: Vendor,
                    as: 'vendor'
                }
            },
            order: [['createdAt', 'DESC']],
            limit: 30
        });
        return transactions;
    } catch (error) {
        console.error('Error fetching card transactions', error);
        throw error;
    }
}

exports.payStatement = async (paymentData) => {
    try {
        await sequelize.authenticate();
        const { statementID, paymentAmount, confirmation } = paymentData;
        const [updatedCount] = await Statement.update({
            StatementAmount: paymentAmount
        }, {
            where: { StatementID: statementID }
        });
        return updatedCount > 0;
    } catch (error) {
        console.error('Error paying statement', error);
        throw error;
    }
};

exports.getLatestStatement = async ({ cardID }) => {
    try {
        await sequelize.authenticate();
        const statement = await Statement.findOne({
            where: { CardID: cardID },
            order: [['StatementDate', 'DESC']]
        });
        return statement;
    } catch (error) {
        console.error('Error fetching latest statement', error);
        throw error;
    }
};
