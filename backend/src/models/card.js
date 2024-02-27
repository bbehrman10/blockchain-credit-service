const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Card extends Model { }

  Card.init({
    CardID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CreditLimit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    CurrentBalance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    ExpiryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Card'
    
  });

  return Card;
};
