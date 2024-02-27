'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Vendors', {
    VendorID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Description: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Password: {
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
    await queryInterface.dropTable('Vendors');
  }
};
