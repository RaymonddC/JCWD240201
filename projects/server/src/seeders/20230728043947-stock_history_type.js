'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('stock_history_types', [
      {
        type: 'add stock',
        deletedAt: 'null',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'stock opname',
        deletedAt: 'null',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'unit convertion',
        deletedAt: 'null',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'sales',
        deletedAt: 'null',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
