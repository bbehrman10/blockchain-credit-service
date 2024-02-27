const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class Vendor extends Model {}

    Vendor.init({
        VendorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        Description: {
          type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'Vendor',
    });

    return Vendor;
};
