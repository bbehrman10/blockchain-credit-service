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
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
          Status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'CreditActivity',
    });

    return CreditActivity;
};
