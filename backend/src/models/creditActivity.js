const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class CreditActivity extends Model {}

    CreditActivity.init({
        ActivityID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Amount: {
          type: DataTypes.DECIMAL(10, 4),
          allowNull: false
        },
        USDEquivalent: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true
        },
          Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        BlockchainTransactionID: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'CreditActivity',
    });

    return CreditActivity;
};
