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
    await queryInterface.bulkInsert('transaction_statuses', [
      {
        status: 'Waiting for payment',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'Waiting for confirmation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'Process',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'On The Way',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'Arrived',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'Complaint',
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
