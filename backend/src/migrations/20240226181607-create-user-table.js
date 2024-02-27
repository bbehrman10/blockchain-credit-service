'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Users', {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    PasswordHash: {
      type: Sequelize.STRING,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
