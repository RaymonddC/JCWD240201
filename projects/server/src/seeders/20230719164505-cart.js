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
    await queryInterface.bulkInsert('carts', [
      {
        user_id: 5,
        product_id: 1,
        qty: 1,
        prescription_image: null,
        confirmation: false,
        is_check: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        product_id: 1,
        qty: 1,
        prescription_image: null,
        confirmation: false,
        is_check: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        product_id: 2,
        qty: 1,
        prescription_image: null,
        confirmation: false,
        is_check: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        product_id: 2,
        qty: 1,
        prescription_image: null,
        confirmation: false,
        is_check: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        product_id: 2,
        qty: 1,
        prescription_image: null,
        confirmation: false,
        is_check: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        product_id: 2,
        qty: 1,
        prescription_image: null,
        confirmation: false,
        is_check: true,
        deletedAt: null,
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
