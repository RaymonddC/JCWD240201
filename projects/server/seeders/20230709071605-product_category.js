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
    await queryInterface.bulkInsert('product_types', [
      {
        category_name: 'Vitamin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat batuk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat Demam',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat Flu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat sakit Kepala',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat Sakit Tenggorokan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Jamu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Antibiotik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Susu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat Mata',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category_name: 'Obat Mata Kering',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
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
  },
};
