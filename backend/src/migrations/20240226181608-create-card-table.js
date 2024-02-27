'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      CardID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'UserID'
        },
      },
      CreditLimit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      CurrentBalance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      ExpiryDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
   await queryInterface.dropTable('Cards');
  }
}
