'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      packaging_type_id: {
        type: Sequelize.INTEGER,
      },
      product_type_id: {
        type: Sequelize.INTEGER,
      },
      net_content: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(1000),
      },
      dosing: {
        type: Sequelize.STRING(1000),
      },
      BPOM_id: {
        type: Sequelize.STRING,
      },
      require_prescription: {
        type: Sequelize.BOOLEAN,
      },
      price: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('products');
  },
};
