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
    await queryInterface.bulkInsert('product_images', [
      {
        product_id: 32,
        image: 'public\\product_images\\tolak angin madu.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 33,
        image: 'public\\product_images\\antangin_goodnight_4_tablet.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 34,
        image: 'public\\product_images\\lelap.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 35,
        image: 'public\\product_images\\kunyit_asam.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 36,
        image: 'public\\product_images\\pacekap.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 37,
        image: 'public\\product_images\\clinmas.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 38,
        image: 'public\\product_images\\zithrolic.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 39,
        image: 'public\\product_images\\ciflos.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 40,
        image: 'public\\product_images\\Pritalinc.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 41,
        image: 'public\\product_images\\Nomika.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 42,
        image: 'public\\product_images\\Ensure Vanilla.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 43,
        image: 'public\\product_images\\Nutribaby Royal.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 44,
        image: 'public\\product_images\\PediaComplete.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 45,
        image: 'public\\product_images\\diabetasol_rasa_vanila_180_gram.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 46,
        image: 'public\\product_images\\entrasol_gold.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 21,
        image: 'public\\product_images\\tolak_flu.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 47,
        image: 'public\\product_images\\Acetin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 48,
        image: 'public\\product_images\\Benadryl.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 49,
        image: 'public\\product_images\\Bisolvon.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 50,
        image: 'public\\product_images\\Cohistan.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 51,
        image: 'public\\product_images\\Epexol.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 52,
        image: 'public\\product_images\\Antrain.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 53,
        image: 'public\\product_images\\Biogesic.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 54,
        image: 'public\\product_images\\bodrex.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 55,
        image: 'public\\product_images\\Cargesik.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 56,
        image: 'public\\product_images\\Exedra_rema.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 57,
        image: 'public\\product_images\\Cooling5_Antiseptik_Spray.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 58,
        image: 'public\\product_images\\Degirol.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 59,
        image: 'public\\product_images\\Larutan_Penyegar_Cap_Badak.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 60,
        image: 'public\\product_images\\Hau_Fung_San.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 61,
        image: 'public\\product_images\\Tantum_Lozenges.jpg',
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
     *
     */
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
    await sequelize.query('TRUNCATE TABLE products', options);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
  },
};
