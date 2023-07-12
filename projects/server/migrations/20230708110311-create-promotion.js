'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      promotion_type_id: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      buy: {
        type: Sequelize.INTEGER
      },
      get: {
        type: Sequelize.INTEGER
      },
      minimum_transaction: {
        type: Sequelize.INTEGER
      },
      maximum_discount_amount: {
        type: Sequelize.INTEGER
      },
      date_start: {
        type: Sequelize.DATEONLY
      },
      date_end: {
        type: Sequelize.DATEONLY
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('promotions');
  }
};