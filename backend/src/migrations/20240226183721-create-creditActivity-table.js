'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('CreditActivities', {
      ActivityID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      BlockchainTransactionID: {
        type: Sequelize.STRING,
        allowNull: true
      },
      VendorClientID: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: 'VendorClients',
          key: 'ClientID'
        }
      },
      CardID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cards',
          key: 'CardID'
        }

      },
      StatementID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Statements',
          key: 'StatementID'
        }
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('CreditActivities');
  }
};
