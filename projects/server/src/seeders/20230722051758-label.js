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
    await queryInterface.bulkInsert('labels', [
      {
        product_id: 2,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 11,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 12,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 13,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 14,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 15,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 16,
        category_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 2,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        category_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        category_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        category_id: 11,
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
