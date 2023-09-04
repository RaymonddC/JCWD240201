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
        createdAt: new Date('2023-08-01' + ''),
        updatedAt: new Date('2023-08-01' + ''),
      },
      {
        transaction_id: 2,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-02' + ''),
        updatedAt: new Date('2023-08-02' + ''),
      },
      {
        transaction_id: 3,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-03' + ''),
        updatedAt: new Date('2023-08-03' + ''),
      },
      {
        transaction_id: 4,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-04' + ''),
        updatedAt: new Date('2023-08-04' + ''),
      },
      {
        transaction_id: 5,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-05' + ''),
        updatedAt: new Date('2023-08-05' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-06' + ''),
        updatedAt: new Date('2023-08-06' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-07' + ''),
        updatedAt: new Date('2023-08-07' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-08' + ''),
        updatedAt: new Date('2023-08-08' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-09' + ''),
        updatedAt: new Date('2023-08-09' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-10' + ''),
        updatedAt: new Date('2023-08-10' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-11' + ''),
        updatedAt: new Date('2023-08-11' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-12' + ''),
        updatedAt: new Date('2023-08-12' + ''),
      },
      {
        transaction_id: 1,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-13' + ''),
        updatedAt: new Date('2023-08-13' + ''),
      },
      {
        transaction_id: 2,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-14' + ''),
        updatedAt: new Date('2023-08-14' + ''),
      },
      {
        transaction_id: 3,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-15' + ''),
        updatedAt: new Date('2023-08-15' + ''),
      },
      {
        transaction_id: 4,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-16' + ''),
        updatedAt: new Date('2023-08-16' + ''),
      },
      {
        transaction_id: 5,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-17' + ''),
        updatedAt: new Date('2023-08-17' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-18' + ''),
        updatedAt: new Date('2023-08-18' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-19' + ''),
        updatedAt: new Date('2023-08-19' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-20' + ''),
        updatedAt: new Date('2023-08-20' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-21' + ''),
        updatedAt: new Date('2023-08-21' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-22' + ''),
        updatedAt: new Date('2023-08-22' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-23' + ''),
        updatedAt: new Date('2023-08-23' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-24' + ''),
        updatedAt: new Date('2023-08-24' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-25' + ''),
        updatedAt: new Date('2023-08-25' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-26' + ''),
        updatedAt: new Date('2023-08-26' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-27' + ''),
        updatedAt: new Date('2023-08-27' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-28' + ''),
        updatedAt: new Date('2023-08-28' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-29' + ''),
        updatedAt: new Date('2023-08-29' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-30' + ''),
        updatedAt: new Date('2023-08-30' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-08-31' + ''),
        updatedAt: new Date('2023-08-31' + ''),
      },
      {
        transaction_id: 6,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-01' + ''),
        updatedAt: new Date('2023-09-01' + ''),
      },
      {
        transaction_id: 7,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-02' + ''),
        updatedAt: new Date('2023-09-02' + ''),
      },
      {
        transaction_id: 8,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-03' + ''),
        updatedAt: new Date('2023-09-03' + ''),
      },
      {
        transaction_id: 9,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-04' + ''),
        updatedAt: new Date('2023-09-04' + ''),
      },
      {
        transaction_id: 10,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-05' + ''),
        updatedAt: new Date('2023-09-05' + ''),
      },
      {
        transaction_id: 11,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-06' + ''),
        updatedAt: new Date('2023-09-06' + ''),
      },
      {
        transaction_id: 12,
        transaction_status_id: 6,
        is_active: true,
        createdAt: new Date('2023-09-07' + ''),
        updatedAt: new Date('2023-09-07' + ''),
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
