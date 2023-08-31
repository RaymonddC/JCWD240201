'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert('question_categories', [
      {
        name: 'Suplements',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Medicine',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alergies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pregnancy',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
