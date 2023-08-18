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
        product_id: 17,
        image: 'public\\product_images\\ceteme.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 18,
        image: 'public\\product_images\\cerini.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 19,
        image: 'public\\product_images\\panadol-anak.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 20,
        image: 'public\\product_images\\trisela.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 21,
        image: 'public\\product_images\\tolak-angin-cair-flu.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 22,
        image: 'public\\product_images\\vitacimin-lemon.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 23,
        image: 'public\\product_images\\vitamin-c-ipi.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 24,
        image: 'public\\product_images\\vitamin-a-ipi.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 25,
        image: 'public\\product_images\\vitamin-a-200000.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 26,
        image: 'public\\product_images\\vitamin-b-complex.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 27,
        image: 'public\\product_images\\bodrexin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 28,
        image: 'public\\product_images\\biogesic.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 29,
        image: 'public\\product_images\\dumin.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 30,
        image: 'public\\product_images\\farsifen.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 31,
        image: 'public\\product_images\\inzana.jpeg',
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
