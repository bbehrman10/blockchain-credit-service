const {User, Card, CreditActivity, VendorClient, sequelize} = require('../../models');

exports.createCreditActivity = async (cardID, statementID, clientID, activityDate, activityAmount, activityType) => {};

exports.getCreditActivity = async (cardID) => {};

exports.updateCreditActivity = async (activityID, activityAmount, activityType) => {};