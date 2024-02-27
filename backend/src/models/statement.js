const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class Statement extends Model {}

    Statement.init({
        StatementID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        Paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: 'Statement',
    });

    return Statement;
};
