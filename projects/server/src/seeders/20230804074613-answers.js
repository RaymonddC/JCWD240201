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
    await queryInterface.bulkInsert('answers', [
      {
        answer:'asnwer 1 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 2 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 3 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 4 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 5 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 6 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        answer:'asnwer 7 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 8 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 9 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 10 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 11 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        answer:'asnwer 12 Alo, terimakasih atas pertanyaannya./n Bengkak di mata memang bisa saja terjadi karena timbilen (bintitan, hordeolum). Timbilen sendiri muncul akibat meradangnya kelenjar minyak di kelopak mata. Selain bengkak, timbilen juga bisa membuat kelopak mata tampak kemerahan, terasa nyeri dan mengganjal, teraba hangat, muncul benjolan, bahkan bisa pecah dan mengeluarkan nanah, lendir, atau darah./n/n Bukan hanya timbilen, bengkak di mata Anda bisa juga muncul akibat hal lain, contohnya habis menangis atau tidur terlalu lama, dermatitis kontak, digigit serangga, selulitis, alergi terhadap substansi tertentu, cidera di sekitar mata, kalazion, dan sebagainya./n/n Saran kami, mengingat sudah seminggu keluhan Anda muncul, cobalah periksa langsung ke dokter agar diberi penanganan optimal. Sembari itu, Anda bisa lakukan dulu:/n/n/n Rajin mencuci muka dan bersihkan area sekitar mata Anda dengan sabun yang lembut/n Kompres hangat mata yang bengkak/n Tidak memegang-megang area sekitar mata dengan tangan kotor/n Tidak dulu menggunakan lensa kontak dan kosmetika berlebihan di sekitar mata/n Hindari memencet, menusuk, atau mengobati sembarangan mata yang bengkak/n Semoga membantu ya..',
        question_id: 12,
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
