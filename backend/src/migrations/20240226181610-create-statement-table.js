'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statements', {
      StatementID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CardID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cards',
          key: 'CardID'
        }
      },
      Balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Statements');
  }
};
