require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const VendorModel = require('./vendor');
const VendorClientModel = require('./vendorClient');
const CardModel = require('./card');
const CreditActivityModel = require('./creditActivity');
const StatementModel = require('./statement');

const DATABASE_URL = "postgres://postgres:postgrespw@localhost:55005";

const sequelize = new Sequelize(DATABASE_URL, {
    models: [UserModel, VendorModel, VendorClientModel, CardModel, CreditActivityModel, StatementModel],
})

const User = UserModel(sequelize, Sequelize);
const Vendor = VendorModel(sequelize, Sequelize);
const VendorClient = VendorClientModel(sequelize, Sequelize);
const Card = CardModel(sequelize, Sequelize);
const CreditActivity = CreditActivityModel(sequelize, Sequelize);
const Statement = StatementModel(sequelize, Sequelize);

User.hasMany(Card, { foreignKey: 'UserID', as: 'cards' });
User.hasMany(Statement, { foreignKey: 'UserID', as: 'statements' });
Card.belongsTo(User, { foreignKey: 'UserID', as: 'user' });
Card.hasMany(CreditActivity, { foreignKey: 'CardID', as: 'creditActivities' });
Card.hasMany(Statement, { foreignKey: 'CardID', as: 'statements' });
CreditActivity.belongsTo(Card, { foreignKey: 'CardID', as: 'card' });
CreditActivity.belongsTo(Statement, { foreignKey: 'StatementID', as: 'statement' });
CreditActivity.belongsTo(VendorClient, { foreignKey: 'ClientID', as: 'vendorClient' });
Vendor.hasMany(VendorClient, { foreignKey: 'VendorID', as: 'vendorClients' });
VendorClient.hasMany(CreditActivity, { foreignKey: 'ClientID', as: 'creditActivities' });
VendorClient.belongsTo(Vendor, { foreignKey: 'VendorID', as: 'vendor' });
Statement.hasMany(CreditActivity, { foreignKey: 'StatementID', as: 'creditActivities' });
Statement.belongsTo(Card, { foreignKey: 'CardID', as: 'card' });
Statement.belongsTo(User, { foreignKey: 'UserID', as: 'user' });


const db = {
    sequelize,
    Sequelize,
    User,
    Vendor,
    VendorClient,
    Card,
    CreditActivity,
    Statement
}

module.exports = db;