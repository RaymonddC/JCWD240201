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
        product_id: 2,
        image: 'product_images/blecidex_tetes_mata_telinga_5_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 3,
        image:
          'product_images/cendo_asthenof_tetes_mata_minidose_0,6_ml_5_ampul.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 4,
        image: 'product_images/cendo_catarlent_tetes_mata_15_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 5,
        image: 'product_images/cendo_fenicol_0,25_tetes_mata_5_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 6,
        image: 'product_images/cendo_fenicol_salep_mata_3,5_gr.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 7,
        image:
          'product_images/cendo_cenfresh_tetes_mata_minidose_0.6_ml_5_ampul.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 8,
        image:
          'product_images/cendo_hyalub_tetes_mata_minidose_0.6_ml_5_ampul.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 9,
        image: 'product_images/sanbe_tears_tetes_mata_8_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 10,
        image: 'product_images/insto_dry_eyes_7,5_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 11,
        image: 'product_images/rohto_dryfresh_7_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 12,
        image: 'product_images/rohto_tetes_mata_7_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 13,
        image: 'product_images/insto_regular_tetes_mata_15_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 14,
        image: 'product_images/rohto_v-extra_tetes_mata_7_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 15,
        image:
          'product_images/cendo_xitrol_tetes_mata_minidose_0.6_ml_5_ampul.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 16,
        image: 'product_images/callusol_cairan_obat_luar_10_ml.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 32,
        image: 'product_images/tolak angin madu.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 33,
        image: 'product_images/antangin_goodnight_4_tablet.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 34,
        image: 'product_images/lelap.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 35,
        image: 'product_images/kunyit_asam.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 36,
        image: 'product_images/pacekap.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 37,
        image: 'product_images/clinmas.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 38,
        image: 'product_images/zithrolic.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 39,
        image: 'product_images/ciflos.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 40,
        image: 'product_images/Pritalinc.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 41,
        image: 'product_images/Nomika.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 42,
        image: 'product_images/Ensure Vanilla.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 43,
        image: 'product_images/Nutribaby Royal.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 44,
        image: 'product_images/PediaComplete.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 45,
        image: 'product_images/diabetasol_rasa_vanila_180_gram.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 46,
        image: 'product_images/entrasol_gold.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 17,
        image: 'product_images/ceteme.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 18,
        image: 'product_images/cerini.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 19,
        image: 'product_images/panadol-anak.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 20,
        image: 'product_images/trisela.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 21,
        image: 'product_images/tolak-angin-cair-flu.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 22,
        image: 'product_images/vitacimin-lemon.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 23,
        image: 'product_images/vitamin-c-ipi.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 24,
        image: 'product_images/vitamin-a-ipi.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 25,
        image: 'product_images/vitamin-a-200000.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 26,
        image: 'product_images/vitamin-b-complex.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 27,
        image: 'product_images/bodrexin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 28,
        image: 'product_images/alphamol.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 29,
        image: 'product_images/dumin.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 30,
        image: 'product_images/farsifen.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 31,
        image: 'product_images/inzana.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 47,
        image: 'product_images/Acetin.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 48,
        image: 'product_images/Benadryl.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 49,
        image: 'product_images/Bisolvon.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 50,
        image: 'product_images/Cohistan.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 51,
        image: 'product_images/Epexol.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 52,
        image: 'product_images/Antrain.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 53,
        image: 'product_images/Biogesic.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 54,
        image: 'product_images/bodrex.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 55,
        image: 'product_images/Cargesik.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 56,
        image: 'product_images/Exedra_rema.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 57,
        image: 'product_images/Cooling5_Antiseptik_Spray.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 58,
        image: 'product_images/Degirol.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 59,
        image: 'product_images/Larutan_Penyegar_Cap_Badak.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 60,
        image: 'product_images/Hau_Fung_San.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        product_id: 61,
        image: 'product_images/Tantum_Lozenges.jpg',
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
