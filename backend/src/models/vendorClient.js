const { Sequelize, Model, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class VendorClient extends Model { }
  VendorClient.init({
    ClientID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
,    ContractAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FunctionSignature: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'VendorClient',
  });

  return VendorClient;
};