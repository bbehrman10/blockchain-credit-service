const { Sequelize, Model, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class VendorClient extends Model { }
  VendorClient.init({
    ClientID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ContractAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FunctionSignature: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FunctionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    WhiteListedURL: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'VendorClient',
  });

  return VendorClient;
};