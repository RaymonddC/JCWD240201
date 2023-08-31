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
    await queryInterface.bulkInsert('product_categories', [
      {
        //1
        category_name: 'Vitamin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 2
        category_name: 'Obat batuk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 3
        category_name: 'Obat Demam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 4
        category_name: 'Obat Flu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 5
        category_name: 'Obat sakit Kepala',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 6
        category_name: 'Obat Tenggorokan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 7
        category_name: 'Jamu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 8
        category_name: 'Antibiotik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 9
        category_name: 'Susu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 10
        category_name: 'Obat Mata',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 11
        category_name: 'Obat Mata Kering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 12
        category_name: 'Obat Mata Merah',
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
    await sequelize.query('TRUNCATE TABLE product_categories', options);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
  },
};
