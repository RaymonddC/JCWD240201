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
    await queryInterface.bulkInsert('promotions', [
      {
        product_id: 1,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 2,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 15000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-09-09',
        date_end: '2023-09-30',
        limit: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 20000,
        date_start: '2023-10-09',
        date_end: '2023-10-30',
        limit: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        promotion_type_id: 1,
        discount: 15,
        maximum_discount_amount: 30000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        promotion_type_id: 1,
        discount: 10,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 15,
        minimum_transaction: 100000,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 15,
        minimum_transaction: 100000,
        maximum_discount_amount: 10000,
        date_start: '2023-09-09',
        date_end: '2023-09-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 25,
        minimum_transaction: 100000,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-09-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 25,
        minimum_transaction: 50000,
        maximum_discount_amount: 15000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 20,
        minimum_transaction: 150000,
        maximum_discount_amount: 20000,
        date_start: '2023-08-09',
        date_end: '2023-10-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 5,
        minimum_transaction: 30000,
        maximum_discount_amount: 5000,
        date_start: '2023-07-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 15,
        minimum_transaction: 100000,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-11-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promotion_type_id: 2,
        discount: 15,
        minimum_transaction: 100000,
        maximum_discount_amount: 10000,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 1,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 2,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-09-09',
        date_end: '2023-09-30',
        limit: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 150,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-10-09',
        date_end: '2023-10-30',
        limit: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        promotion_type_id: 3,
        buy: 1,
        get: 1,
        date_start: '2023-08-09',
        date_end: '2023-08-30',
        limit: 100,
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
