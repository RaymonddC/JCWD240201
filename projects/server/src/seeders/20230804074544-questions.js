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
    await queryInterface.bulkInsert('questions', [
      {
        title: 'title 1 cat suplements Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 1 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 2 cat suplements Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 2 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 3 cat suplements Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 3 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 4 cat medicine Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 4 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 5 cat medicine Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 5 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 6 cat medicine Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 6 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 7 cat alergies Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 7 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 8 cat alergies Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 8 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 9 cat alergies Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 9 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 10 cat pregnancy Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 10 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 11 cat pregnancy Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 11 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 12 cat pregnancy Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 12 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 13 cat pregnancy Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 13 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 14 cat pregnancy Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 14 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'title 15 cat pregnancy Apakah obat untuk mengatasi mata yang timbilan?',
        question: 'question 15 Dok, mata sy bengkak sdah seminggu lbih trus udah di obatin tp nggk ada perubahan, mungkin kalo kata orang timbilen kira" apa yaa obat yg cocok untuk mata timbilen tsb? Terima Kasih.',
        question_category_id:3,
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
