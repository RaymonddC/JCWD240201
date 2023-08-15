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
    await queryInterface.bulkInsert('transaction_histories', [
      {
        transaction_id: 1,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-01' + ''),
        updatedAt: new Date('2023-07-01' + ''),
      },
      {
        transaction_id: 2,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-02' + ''),
        updatedAt: new Date('2023-07-02' + ''),
      },
      {
        transaction_id: 3,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-03' + ''),
        updatedAt: new Date('2023-07-03' + ''),
      },
      {
        transaction_id: 4,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-04' + ''),
        updatedAt: new Date('2023-07-04' + ''),
      },
      {
        transaction_id: 5,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-05' + ''),
        updatedAt: new Date('2023-07-05' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-06' + ''),
        updatedAt: new Date('2023-07-06' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-07' + ''),
        updatedAt: new Date('2023-07-07' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-08' + ''),
        updatedAt: new Date('2023-07-08' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-09' + ''),
        updatedAt: new Date('2023-07-09' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-10' + ''),
        updatedAt: new Date('2023-07-10' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-11' + ''),
        updatedAt: new Date('2023-07-11' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-12' + ''),
        updatedAt: new Date('2023-07-12' + ''),
      },
      {
        transaction_id: 1,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-13' + ''),
        updatedAt: new Date('2023-07-13' + ''),
      },
      {
        transaction_id: 2,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-14' + ''),
        updatedAt: new Date('2023-07-14' + ''),
      },
      {
        transaction_id: 3,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-15' + ''),
        updatedAt: new Date('2023-07-15' + ''),
      },
      {
        transaction_id: 4,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-16' + ''),
        updatedAt: new Date('2023-07-16' + ''),
      },
      {
        transaction_id: 5,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-17' + ''),
        updatedAt: new Date('2023-07-17' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-18' + ''),
        updatedAt: new Date('2023-07-18' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-19' + ''),
        updatedAt: new Date('2023-07-19' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-20' + ''),
        updatedAt: new Date('2023-07-20' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-21' + ''),
        updatedAt: new Date('2023-07-21' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-22' + ''),
        updatedAt: new Date('2023-07-22' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-23' + ''),
        updatedAt: new Date('2023-07-23' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-24' + ''),
        updatedAt: new Date('2023-07-24' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-25' + ''),
        updatedAt: new Date('2023-07-25' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-26' + ''),
        updatedAt: new Date('2023-07-26' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-27' + ''),
        updatedAt: new Date('2023-07-27' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-28' + ''),
        updatedAt: new Date('2023-07-28' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-29' + ''),
        updatedAt: new Date('2023-07-29' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-30' + ''),
        updatedAt: new Date('2023-07-30' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-07-31' + ''),
        updatedAt: new Date('2023-07-31' + ''),
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
