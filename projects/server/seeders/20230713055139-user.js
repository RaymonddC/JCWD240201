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
    await queryInterface.bulkInsert('users', [
      {
        full_name: 'Eggi Eka Yapari',
        username: 'Eggi',
        email: 'eggiyapari19@gmail.com',
        password: 'abc123456',
        phone_number: '08146515145',
        role_id: null,
        profile_image: null,
        birthdate: null,
        gender: null,
        verified: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Eggi Yapari',
        username: 'Eggi19',
        email: 'eggiyapari3661@gmail.com',
        password: 'abc123456',
        phone_number: '08146515145',
        role_id: null,
        profile_image: null,
        birthdate: null,
        gender: null,
        verified: true,
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
