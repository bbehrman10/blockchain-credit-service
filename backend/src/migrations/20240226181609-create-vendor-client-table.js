'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VendorClients', {
      ClientID: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ContractAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FunctionSignature: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      FunctionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      VendorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vendors',
          key: 'VendorID'
        }
      },
      WhiteListedURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VendorClients');
  }
};
