'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      promotion_id: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      city_id: {
        type: Sequelize.INTEGER,
      },
      notes: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      receiver: {
        type: Sequelize.STRING,
      },
      shipment_fee: {
        type: Sequelize.INTEGER,
      },
      total_discount: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      shipment: {
        type: Sequelize.STRING,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
