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
      {
        full_name: 'Raymond R',
        username: 'raymonds',
        email: 'raymond@gmail.com',
        password:
          '$2b$10$LNEd92twemC83abFs/gmy.t4BFs5bKm0YoohcH7J5CkU5nI1w.ZaG',
        phone_number: '08146515145',
        role_id: 2,
        profile_image: null,
        birthdate: null,
        gender: null,
        verified: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Admin R',
        username: 'AdminR',
        email: 'admin@gmail.com',
        password:
          '$2b$10$LNEd92twemC83abFs/gmy.t4BFs5bKm0YoohcH7J5CkU5nI1w.ZaG',
        phone_number: '08146515145',
        role_id: 1,
        profile_image: null,
        birthdate: null,
        gender: null,
        verified: true,
        deletedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: 'Enzo',
        username: 'enzoadmin',
        email: 'enzoadmin@gmail.com',
        password:
          '$2b$10$u7R2vd6FdsZIClvjUQNkS.nDymAzTh4E6q7qMdkI0ddSTDMnPF57e',
        phone_number: '08146515145',
        role_id: 1,
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
