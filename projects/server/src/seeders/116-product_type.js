'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_types', [
      {
        type_name: 'capsule',
        unit: 'pcs',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'liquid',
        unit: 'ml',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'powder',
        unit: 'gr',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type_name: 'tablet',
        unit: 'pcs',
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
    await sequelize.query('TRUNCATE TABLE product_types', options);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
  },
};
