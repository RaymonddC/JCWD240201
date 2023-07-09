'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('packaging_types', [
      {
        type_name: 'bottle',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'strip',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'sachet',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'tube',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'ampul',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'blister',
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
