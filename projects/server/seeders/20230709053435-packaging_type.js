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
        type_name: 'blister',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'can/ kaleng',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'ampul',
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
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
    await sequelize.query('TRUNCATE TABLE packaging_types', options);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
  },
};
