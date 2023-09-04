'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      // obat mata-------------------------------------------------------------------------------------
      {
        //1
        name: 'Obat Racik/Resep',
        packaging_type_id: null,
        product_type_id: null,
        net_content: null,
        description: 'Obat Racik/Resep',
        dosing: null,
        BPOM_id: null,
        require_prescription: true,
        price: 0,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //2
        name: 'Blecidex Tetes Mata/Telinga 5 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 5,
        description:
          'Aturan pakai\r\nTeteskan pada mata atau telinga yang sakit. Hindari kontak langsung ujung penetes dengan mata, telinga, atau benda lain agar obat tidak terkontaminasi. Jangan digunakan lebih dari 7 hari.\r\n\r\nPerhatian\r\nIbu hamil, ibu menyusui, bayi, dan anak. Tidak boleh digunakan pada luka terbuka atau kulit yang mengalami kerusakan.\r\n\r\nEfek samping\r\nPenglihatan buram sementara, mata terasa panas atau perih, iritasi, dan rasa gatal.',
        dosing:
          'Untuk mata: 1-2 tetes, 6 kali sehari.\r\nUntuk telinga: 2-3 tetes, 3-4 kali sehari.',
        BPOM_id: 'DKL0022231660A1',
        require_prescription: true,
        price: 80743,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 3
        name: 'Cendo Asthenof Tetes Mata Minidose 0,6 Ml 5 Ampul',
        packaging_type_id: 2,
        product_type_id: 4,
        net_content: 5,
        description:
          'Cendo Asthenof Tetes Mata Minidose 0,6 ml bermanfaat untuk mengatasi mata merah yang disebabkan oleh iritasi ringan. \r\n\r\nCendo Asthenof Tetes Mata Minidose 0,6 ml mengandung bahan aktif oxymetazoline HCl. Obat ini bekerja dengan cara menyempitkan pemburuh darah kecil yang ada di bagian putih mata (sklera), sehingga dapat meredakan mata merah.',
        dosing: '1–2 tetes pada mata yang mengalami keluhan.',
        BPOM_id: 'DTL7803812846A1',
        require_prescription: false,
        price: 31680,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 4
        name: 'Cendo Catarlent Tetes Mata 15 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 15,
        description:
          'Cendo Catarlent Eye Drop 15 Ml bermanfaat untuk membantu meredakan kekeruhan pada cairan mata. \r\n\r\nCara kerja Cendo Catarlent Eye Drop 15 Ml belum diketahui secara pasti. Namun, menurut sebuah penelitian, kalium iodida mempunyai efek untuk membunuh mikroba.',
        dosing:
          'Gunakan Cendo Catarlent Eye Drop 15 Ml sebanyak 1-2 tetes, 3 kali sehari, atau sesuai petunjuk dokter.',
        BPOM_id: 'DKL7603811646A1',
        require_prescription: true,
        price: 43465,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 5
        name: 'Cendo Fenicol 0,25% Tetes Mata 5 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 5,
        description:
          'Cendo Fenicol 0,25% Sterile Eye Drops-Tetes Mata 5 Ml bermanfaat untuk mengobati konjungtivitis akibat infeksi bakteri pada mata. \r\n\r\nCendo Fenicol 0,25% Sterile Eye Drops-Tetes Mata 5 Ml bekerja dengan cara membasmi bakteri penyebab infeksi dan menghentikan pertumbuhannya.',
        dosing:
          'Gunakan Cendo Fenicol 0,25% Sterile Eye Drops-Tetes Mata 5 Ml 1 tetes setiap 2 jam, selama 2 hari pertama. Setelah itu, kurangi dosis menjadi 1 tetes, 3-4 kali per hari, selama 3 hari.\r\n',
        BPOM_id: 'DKL7803809346C1',
        require_prescription: true,
        price: 33144,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 6
        name: 'Cendo Fenicol Salep Mata 3,5 gr',
        packaging_type_id: 4,
        product_type_id: 3,
        net_content: 3.5,
        description:
          'Cendo Fenicol Eye Ointment-Salep Mata 3,5 gr bermanfaat untuk mengobati konjungtivitis akibat infeksi bakteri pada mata. \r\n\r\nCendo Fenicol Eye Ointment-Salep Mata 3,5 gr bekerja dengan cara membasmi bakteri penyebab infeksi dan menghentikan pertumbuhannya.',
        dosing:
          'Oleskan Cendo Fenicol Eye Ointment-Salep Mata 3,5 gr sebanyak 4-5 kali sehari hingga infeksi sembuh, atau sesuai anjuran dokter. Jangan menggunakan obat lebih dari 1 minggu, kecuali atas saran dokter.',
        BPOM_id: 'DKL7803814631A1',
        require_prescription: true,
        price: 31574,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 7
        name: 'Cendo Cenfresh Tetes Mata Minidose 0,6 Ml 5 Ampul',
        packaging_type_id: 2,
        product_type_id: 4,
        net_content: 5,
        description:
          'Cendo Cenfresh Tetes Mata bekerja dengan membentuk lapisan pelindung pada permukaan mata yang melapisi dan membasahi mata agar tetap sehat dan nyaman. Obat ini menenangkan dan menjaga kelembapan mata, sehingga dapat mengurangi gejala mata kering seperti rasa terbakar atau gatal pada mata.',
        dosing:
          'Teteskan Cendo Cenfresh Tetes Mata sebanyak 1–2 tetes, sebanyak 3–4 kali sehari pada mata yang sakit.',
        BPOM_id: 'DTL0203808746A1',
        require_prescription: false,
        price: 29700,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 8
        name: 'Cendo Hyalub Tetes Mata Minidose 0,6 Ml 5 Ampul',
        packaging_type_id: 2,
        product_type_id: 4,
        net_content: 5,
        description:
          'Cendo Hyalub Tetes Mata Minidose bermanfaat untuk menghilangkan rasa terbakar, iritasi, atau ketidaknyamanan karena mata kering dan juga membantu pemulihan cedera pada mata seperti abrasi kornea.\r\n\r\nCendo Hyalub Tetes Mata Minidose mengandung sodium hyaluronate yang memiliki kemampuan menyimpan air dengan baik. Setiap molekul sodium hyaluronate dapat mengikat sejumlah molekul air, sehingga kelembapan mata dapat terjaga.',
        dosing:
          'Teteskan Cendo Hyalub Tetes Mata Minidose sebanyak 1 tetes, 5–6 kali sehari pada mata yang sakit.',
        BPOM_id: 'DKL1003812946A1',
        require_prescription: true,
        price: 82327,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 9
        name: 'Sanbe Tears Tetes Mata 8 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 8,
        description:
          'Meredakan sementara ketidak-nyamanan pada mata akibat iritasi ringan atau terpapar pada angin atau sinar matahari dan kekeringan pada mata',
        dosing: '1-2 tetes sesuai anjuran',
        BPOM_id: 'DTL9922230946A1',
        require_prescription: false,
        price: 33884,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 10
        name: 'Insto Dry Eyes 7,5 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 7.5,
        description:
          'Insto Dry Eyes Sterile Eye Drops 7,5 Ml bermanfaat untuk membantu mengatasi mata kering, meredakan iritasi akibat kurangnya produksi air mata. Selain itu, obat ini juga digunakan untuk menjadi pelumas mata palsu. \r\n\r\nInsto Dry Eyes Sterile Eye Drops 7,5 Ml mengandung bahan aktif hydroxypropyl methylcellulose yang akan memberikan efek sebagai pelumas mata, sehingga bisa meredakan keluhan akibat mata kering, seperti rasa gatal atau sensasi mengganjal di mata. ',
        dosing:
          '1–2 tetes di tiap mata, 3 kali sehari atau sesuai anjuran dokter. ',
        BPOM_id: 'DTL1438202146A1',
        require_prescription: false,
        price: 17974,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 11
        name: 'Rohto Dryfresh 7 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 7,
        description:
          'Rohto Dryfresh bermanfaat untuk mengatasi gejala mata kering dan mencegah iritasi akibat kurangnya produksi air mata. Selain itu, obat ini juga dapat digunakan untuk menjadi pelumas pada mata palsu. \r\n\r\nRohto Dryfresh mengandung bahan aktif hydroxypropyl methylcellulose (hypromellose) yang akan melumasi dan melembapkan mata. Obat ini dapat meredakan keluhan akibat mata kering, seperti rasa gatal atau sensasi mengganjal di mata, dan melindungi mata dari cedera dan infeksi.',
        dosing:
          'Dosis umum 1–2 tetes, 3 kali sehari atau sesuai anjuran dokter.',
        BPOM_id: 'DTL1840000946A1',
        require_prescription: false,
        price: 19124,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 12
        name: 'Rohto Tetes Mata 7 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 7,
        description:
          'Rohto Tetes Mata bermanfaat untuk mengatasi mata merah karena iritasi ringan yang disebabkan oleh asap, angin, sinar matahari, suhu dingin, pemakaian lensa kontak, atau aktivitas berenang maupun membaca.\r\n\r\nRohto Tetes Mata mengandung bahan aktif Tetrahydrozoline HCl. Tetrahydrozoline HCl bekerja dengan cara mengecilkan ukuran pembuluh darah di mata untuk sementara waktu agar mata merah mereda.',
        dosing:
          'Teteskan 1-2 tetes pada mata yang sakit atau kedua mata, 2-3 kali sehari.',
        BPOM_id: 'DTL1140000246A1',
        require_prescription: false,
        price: 13690,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 13
        name: 'Insto Regular Tetes Mata 15 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 15,
        description:
          'Insto Regular Tetes Mata 15 Ml bermanfaat untuk mengatasi kemerahan dan rasa perih di mata yang disebabkan oleh iritasi ringan karena debu, asap, atau angin. Selain itu, obat ini juga bisa digunakan setelah berenang. \r\n\r\nInsto Regular Tetes Mata 15 Ml mengandung tetrahydrozoline HCl yang merupakan dekongestan. Obat ini bekerja dengan mempersempit pembuluh darah di mata untuk sementara waktu. Dengan begitu, kemerahan pada mata akan mereda. ',
        dosing:
          '2-3 tetes pada tiap mata, sebanyak 3 atau 4 kali sehari atau sesuai anjuran dokter. ',
        BPOM_id: 'DTL1438202046A1',
        require_prescription: false,
        price: 26290,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 14
        name: 'Rohto V- Extra Tetes Mata 7 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 7,
        description:
          'Rohto V- Extra Tetes Mata 7 Ml bermanfaat untuk meredakan mata merah karena iritasi ringan.\r\n\r\nRohto V- Extra Tetes Mata 7 Ml juga dapat digunakan untuk mengurangi mata kering atau sebagai pelindung terhadap iritasi lebih lanjut. Obat tetes mata ini mengandung bahan aktif Tetrahydrozoline HCl dan Macrogol 400 yang menjaga mata tetap lembab.',
        dosing:
          'Teteskan 1–2 tetes 3–4 kali sehari atau sesuai anjuran dokter.\r\n',
        BPOM_id: 'DTL1840001046A1',
        require_prescription: false,
        price: 20378,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 15
        name: 'Cendo Xitrol Tetes Mata Minidose 0,6 Ml 5 Ampul',
        packaging_type_id: 2,
        product_type_id: 4,
        net_content: 5,
        description:
          'Cendo Xitrol Minidose 0,6 Ml bermanfaat untuk mengobati infeksi mata yang disertai dengan peradangan. \r\n\r\nCendo Xitrol Minidose 0,6 Ml mengandung dexamethasone sodium phosphate, neomycin sulfate, dan polymyxin B sulfate. Polymixin B dan neomycin merupakan antibiotik yang dapat membunuh serta menghambat pertumbuhan bakteri, sedangkan dexamethasone adalah kortikosteroid yang dapat meredakan peradangan.',
        dosing:
          'Gunakan Cendo Xitrol Minidose 0,6 Ml sebanyak 1-2 tetes, tiap 1-2 jam sekali. Dosis dapat dikurangi menjadi 1-2 tetes setiap 4-6 jam sekali jika keluhan sudah membaik.',
        BPOM_id: 'DKL7203809746A1',
        require_prescription: true,
        price: 34953,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 16
        name: 'Callusol Cairan Obat Luar 10 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 10,
        description:
          'Callusol Cairan Obat Luar adalah obat yang bermanfaat untuk menghilangkan kutil, mata ikan, atau kapalan.\r\n\r\nCallusol Cairan Obat Luar bekerja dengan cara melunakkan bagian kulit yang mengeras akibat mata ikan, kutil, atau kapalan, sehingga mempercepat proses pengelupasan dan penggantian sel kulit.',
        dosing:
          'Oleskan Callusol Cairan Obat Luar pada bagian kulit yang bermasalah sebanyak 1–2 kali sehari, hingga kutil, mata ikan, atau kapalan terlepas.',
        BPOM_id: 'DBL0831528141A1',
        require_prescription: false,
        price: 38500,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // obat flu ----------------------------------------------------------------------------
      {
        //17
        name: 'Ceteme 4 Mg 12 Tablet', //Done
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 12,
        description:
          'Ceteme Tablet bermanfaat untuk meredakan gejala alergi pada kondisi rhinitis, 		rhinitis alergi, atau biduran. Gejala alergi yang dimaksud misalnya, mata berair, hidung tersumbat, pilek, bersin, batuk, serta gatal pada kulit, hidung, mata, dan tenggorokan.\nCeteme Tablet mengandung chlorpheniramine maleate yang bekerja dengan cara menghambat kerja histamin, yaitu senyawa yang bisa menyebabkan munculnya gejala alergi saat seseorang terpapar zat atau bahan pemicu alergi (alergen). Dengan begitu, gejala alergi dapat mereda.',
        dosing:
          'Dewasa dan anak usia 12 tahun ke atas: 1 tablet, 3-4 kali sehari.\nAnak-anak usia 6-12 tahun: ½ tablet, 3-4 kali sehari.\nAnak-anak usia 2-6 tahun: ¼ tablet, 3-4 kali sehari.',
        BPOM_id: 'DTL0704002010A1',
        require_prescription: false,
        price: 1837,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //18
      {
        name: 'Cerini 10mg/ml Drop 20ml', //Done
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 20,
        description:
          'Cerini Sirup bermanfaat meredakan gejala atau keluhan akibat reaksi alergi, seperti ruam kulit, biduran, bersin-bersin, serta rasa gatal di kulit, hidung, atau tenggorokan.\nCerini Sirup bekerja dengan cara memblokir histamin. Histamin adalah senyawa yang meningkat jumlahnya dan menimbulkan gejala dan reaksi alergi saat tubuh terpapar alergen (zat pemicu alergi).\nPerlu diketahui bahwa cetirizine dalam Cerini Sirup tidak bisa menyembuhkan alergi. Cara terbaik untuk mencegah timbulnya reaksi alergi adalah dengan menghindari paparan zat pemicu alergi.',
        dosing:
          'Dewasa dan anak usia di atas 12 tahun: 10 ml per hari.\nAnak usia 6-12 tahun: 10 ml per hari atau 5 ml 2 kali sehari.\nAnak usia 2-6 tahun: 5 ml sehari sekali atau 2,5 ml 2 kali sehari',
        BPOM_id: 'DTL1422252537A1',
        require_prescription: true,
        price: 63952,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //19
      {
        name: 'Panadol Anak-Anak Rasa Cherry 10 Tablet', // Done
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Panadol Anak-Anak 10 Tablet Kunyah Rasa Cherry bermanfaat untuk menurunkan demam dan meredakan nyeri, seperti sakit kepala dan sakit gigi.\nPanadol Anak-Anak 10 Tablet Kunyah Rasa Cherry bekerja dengan cara mengurangi produksi zat penyebab peradangan, yaitu prostaglandin. Penurunan kadar prostaglandin di dalam tubuh akan membuat tanda peradangan seperti demam dan nyeri berkurang.',
        dosing:
          'Anak-anak usia 6-12 tahun: 2-4 tablet, 3-4 kali sehari.\nAnak-anak usia 2-5 tahun: 1-2 tablet, 3-4 kali sehari.',
        BPOM_id: 'DBL0124501963B1',
        require_prescription: false,
        price: 18625,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //20
      {
        name: 'Trisela 10 Mg 10 Tablet', //Done
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Trisela merupakan obat yang digunakan untuk mengurangi rasa gatal yang dapat diikuti oleh ruam (gatal) di bagian tubuh tertentu karena suatu alergi.\nObat golongan antihistamin ini bekerja dengan mengikat reseptor histamin supaya terjadi penghambatan efek histamin pada tubuh dan tidak terjadi alergi. Selain itu, obat ini juga dapat menimbulkan efek sedasi atau menimbulkan kantuk.',
        dosing:
          '6-8 tahun : 5ml diminum bila perlu satu dosis tiap 4 jam, tidak lebih dari 5x/hari',
        BPOM_id: 'DTL1306314810A1',
        require_prescription: false,
        price: 64790,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //21
      {
        name: 'Tolak Angin Cair Flu Sido Muncul 15 Ml', //Done
        packaging_type_id: 3,
        product_type_id: 2,
        net_content: 15,
        description:
          'Tolak Angin Cair Flu 15 Ml bermanfaat untuk meringankan gejala selesma atau flu, seperti hidung tersumbat, pilek, sakit kepala dan badan terasa pegal.\nTolak Angin Cair Flu 15 Ml mengandung beberapa bahan herbal, seperti buah adas, kayu ules, daun cengkeh, jahe, daun mint, echinacea, meniran, valerian, dan panax ginseng. Kombinasi semua bahan tersebut dipercaya bisa meredakan gejala selesma sekaligus memelihara daya tahan tubuh.',
        dosing: '3-4x sehari 1 sachet',
        BPOM_id: 'TR032622221',
        require_prescription: false,
        price: 4070,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // obat vitamin ------------------------------------------------------------------------------------------------
      //22
      {
        name: 'Vitacimin Lemon 2 Tablet', //Done
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 2,
        description:
          'Vitacimin Lemon 2 Tablet merupakan suplemen makanan yang mengandung vitamin C. Vitamin ini membantu untuk menjaga daya tahan tubuh.',
        dosing: '1-2 tablet per hari',
        BPOM_id: 'SD021501851',
        require_prescription: false,
        price: 2090,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //23
      {
        name: 'Vitamin C IPI 50 Mg 90 Tablet', //Done
        packaging_type_id: 1,
        product_type_id: 1,
        net_content: 90,
        description:
          'Vitamin C IPI Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.\nVitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',
        dosing: '1 x sehari 1 tablet atau sesuai pada petunjuk kemasan.',
        BPOM_id: 'SD141546241',
        require_prescription: false,
        price: 12153,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //24
      {
        name: 'Vitamin A IPI 45 Tablet', //done
        packaging_type_id: 1,
        product_type_id: 1,
        net_content: 45,
        description:
          'Vitamin A IPI Tablet bermanfaat untuk membantu memenuhi kebutuhan vitamin A.\nVitamin A berperan penting dalam kesehatan mata, sistem imun, dan pertumbuhan sel. Selain itu, suplemen vitamin A bisa digunakan dalam pengobatan campak dan defisiensi (kekurangan) vitamin A, termasuk xerophthalmia.',
        dosing: 'Dewasa dan anak-anak: 1 tablet sehari.',
        BPOM_id: 'SD151546691',
        require_prescription: false,
        price: 6600,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //25
      {
        name: 'Vitamin A 200000 IU 50 Kapsul', //Done
        packaging_type_id: 1,
        product_type_id: 1,
        net_content: 50,
        description:
          'Vitamin A 200.000 IU 50 Kapsul merupakan salah satu vitamin yang berfungsi untuk perkembangan organ tubuh seperti mata, kulit dan sistem kekebalan tubuh.',
        dosing: '1 tablet sehari.',
        BPOM_id: 'GBL9532300102A1',
        require_prescription: false,
        price: 64516,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //26
      {
        name: 'Vitamin B Complex IPI 45 Tablet', //Done
        packaging_type_id: 1,
        product_type_id: 1,
        net_content: 45,
        description:
          'Vitamin B Complex Ipi digunakan untuk mencegah dan mengobati kekurangan vitamin B complex. Cara kerja vitamin ini adalah mensuplai kebutuhan vitamin B complex yang penting untuk metabolisme karbohidrat dan protein dalam tubuh. ',
        dosing: '1 tablet sehari',
        BPOM_id: 'SD141546221',
        require_prescription: false,
        price: 8839,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Obat Demam --------------------------------------------------------------
      //27
      {
        name: 'Bodrexin 80 Mg 6 Tablet', //Done
        packaging_type_id: 1,
        product_type_id: 1,
        net_content: 6,
        description:
          'Bodrexin 80 mg dapat menurunkan demam dan meringankan rasa nyeri pada anak-anak dengan rasa buah yang enak.',
        dosing:
          'Anak 2-3 Tahun : 1 tablet. Anak 4-5 Tahun : 2 tablet. Anak 6-8 Tahun : 3 tablet. Jika perlu bisa diulang tiap 4 jam atau menurut petunjuk dokter.',
        BPOM_id: 'DBL7222708910A1',
        require_prescription: false,
        price: 1879,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //28
      {
        name: 'Alphamol 600 Mg 10 Tablet', //Done
        packaging_type_id: 2,
        product_type_id: 4,
        net_content: 10,
        description:
          'Alphamol bermanfaat untuk untuk meredakan demam dan nyeri, termasuk nyeri haid atau sakit gigi.\nAlphamol Kaplet mengandung 600 mg paracetamol. Paracetamol diketahui bekerja pada pusat pengaturan suhu yang ada di otak untuk menurunkan suhu tubuh saat seseorang sedang mengalami demam.',
        dosing:
          'Dewasa: 1 kaplet, 3-4 kali sehari.\nAnak-anak usia 6-12 tahun: ½ kaplet, 3-4 kali sehari.',
        BPOM_id: 'DBL9230902704A1',
        require_prescription: false,
        price: 10000,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //29
      {
        name: 'Dumin 500 Mg 10 Tablet', //Done
        packaging_type_id: 5,
        product_type_id: 1,
        net_content: 10,
        description:
          'Dumin 500 mg Tablet bermanfaat untuk menurunkan demam dan meredakan nyeri, seperti sakit kepala dan sakit gigi.\nDumin 500 mg Tablet bekerja dengan cara mengurangi produksi zat penyebab peradangan, yaitu prostaglandin. Penurunan kadar prostaglandin di dalam tubuh akan membuat tanda peradangan seperti demam dan nyeri berkurang.',
        dosing:
          'Dewasa: 1 tablet, 3-4 kali sehari.\nAnak-anak usia 6-12 tahun: ½ tablet, 3-4 kali sehari atau sesuai petunjuk dokter',
        BPOM_id: 'DBL8305501304A1',
        require_prescription: false,
        price: 8140,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //30
      {
        name: 'Farsifen 400 Mg 10 Tablet', //Done
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Farsifen 400 mg Tablet bermanfaat untuk meredakan nyeri dan menurunkan demam.\nFarsifen 400 mg Tablet mengandung ibuprofen yang bekerja dengan cara menghambat zat pemicu peradangan di dalam tubuh, yaitu prostaglandin. Dengan berkurangnya peradangan, rasa nyeri juga akan berkurang dan demam akan turun.',
        dosing:
          'Dewasa dan anak usia >12 tahun: 200–400 mg, 3–4 kali sehari. Dosis maksimal 2.400 mg per hari.',
        BPOM_id: 'DKL9409204409A1',
        require_prescription: true,
        price: 11424,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //31
      {
        name: 'Inzana 4 Tablet', //Done
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 4,
        description:
          'Inzana Tablet Kunyah bermanfaat untuk mengurangi rasa sakit dan menurunkan demam pada anak.\nObat ini bekerja dengan cara menghambat enzim alami dan mengencerkan darah di dalam tubuh. Dengan begitu, rasa sakit dapat berkurang dan penggumpalan darah dapat dicegah.',
        dosing:
          'Anak usia 1-2 tahun: 1 tablet, 3-4 kali sehari\nAnak usia 3-5 tahun: 1Â½â€“2 tablet, 3-4 kali sehari\nAnak usia 6-12 tahun: 2Â½â€“5 tablet, 3-4 kali sehari',
        BPOM_id: 'DBL7813003663A1',
        require_prescription: false,
        price: 1307,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // jamu -------------------------------------------------------------------------------
      //32
      {
        name: 'Tolak Angin Plus Madu Sido Muncul 15 Ml 5 Sachet',
        packaging_type_id: 3,
        product_type_id: 2,
        net_content: 15,
        description:
          ' Tolak Angin Sidomuncul 15 Ml bermanfaat untuk mengobati gejala masuk angin, seperti mual, perut kembung, sakit perut, pusing, meriang, dan tenggorokan kering. Produk ini juga baik untuk diminum saat perjalanan jauh, kelelahan, atau kurang tidur.',
        dosing:
          'Untuk mengatasi masuk angin atau diare, minum 3–4 sachet per hari.\nUntuk meningkatkan daya tahan tubuh, minum 2 sachet tiap hari, selama 7 hari atau lebih.\nUntuk mengatasi mabuk perjalanan, minum 1 sachet sebelum melakukan perjalanan atau 1–3 sachet pada saat mabuk perjalanan.\nUntuk mengatasi kelelahan dan kurang tidur, minum 1 sachet saat mengalami kelelahan atau kurang tidur.',
        BPOM_id: 'HT122600301',
        require_prescription: false,
        price: 22550,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //33
      {
        name: 'Antangin Good Night 4 Tablet',
        packaging_type_id: 3,
        product_type_id: 4,
        net_content: 4,
        description:
          'Antangin Good Night dipercaya bermanfaat untuk meringankan gangguan sulit tidur dan meredakan masuk angin.\nAntangin Good Night mengandung ekstrak daun mint, daun sembung, biji pala, jahe, passion flower, valerian, dan kulit pulai. Kombinasi bahan herbal ini dipercaya dapat meredakan gejala masuk angin, mengurangi kecemasan, merilekskan pikiran, dan membuat tidur lebih nyenyak. ',
        dosing: '2-4 tablet sebelum tidur. ',
        BPOM_id: 'TR152585031',
        require_prescription: false,
        price: 7472,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //34
      {
        name: 'Lelap 4 Kaplet',
        packaging_type_id: 3,
        product_type_id: 4,
        net_content: 4,
        description:
          'Lelap 4 Kaplet bermanfaat untuk membantu meringankan gangguan tidur.\nLelap 4 Kaplet mengandung Valerianae radix (valerian), Polygalae radix, Myristicae semen, dan Eleuthroginseng radix. Kombinasi dari bahan-bahan herbal tersebut diyakini bisa mempengaruhi otak dan sistem saraf, sehingga bisa meringankan gangguan tidur. ',
        dosing: '1-2 kaplet dikonsumsi 30-60 menit sebelum tidur.',
        BPOM_id: 'HT142500451',
        require_prescription: false,
        price: 15736,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //35
      {
        name: 'Kunyit Asam Sido Muncul 5 Sachet',
        packaging_type_id: 3,
        product_type_id: 3,
        net_content: 25,
        description:
          'Kunyit Asam Sido Muncul Sachet 25 Gram merupakan produk herbal yang dipercaya bisa membantu melancarkan haid dan menyegarkan badan.\nKunyit Asam Sido Muncul Sachet 25 Gram mengandung ekstrak kunyit dan asam jawa. Kombinasi kedua bahan ini diyakini mampu mengurangi gejala sindrom pramenstruasi (PMS) dan nyeri haid.',
        dosing: '1 bungkus per hari atau sesuai kebutuhan.',
        BPOM_id: 'TR082288331',
        require_prescription: false,
        price: 9092,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pacekap 10 Kapsul',
        packaging_type_id: 6,
        product_type_id: 1,
        net_content: 10,
        description:
          'Pacekap Kapsul dipercaya bermanfaat untuk membantu menstabilkan tekanan darah serta meningkatkan daya tahan tubuh.\nPacekap Kapsul mengandung ekstrak buah mengkudu  yang dipercaya dapat membantu menurunkan tekanan darah tinggi, kadar gula darah tinggi, kadar asam urat, dan kadar kolesterol jahat dalam tubuh.',
        dosing: '1–2 kapsul, 2 kali sehari. ',
        BPOM_id: 'TR122363671',
        require_prescription: false,
        price: 31702,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // antibiotik ---------------------------------------------------------------
      //37
      {
        name: 'Clinmas 150 Mg 10 Kapsul',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Clinmas 150 mg Kapsul bermanfaat untuk mengatasi berbagai infeksi bakteri, seperti infeksi pada paru, kulit, darah, organ reproduksi wanita, atau organ dalam.\nClinmas 150 mg Kapsul mengandung clindamycin yang bekerja dengan cara memperlambat dan menghentikan perkembangbiakan bakteri. Dengan begitu, jumlah bakteri dalam tubuh menjadi terkendali dan bisa dilawan oleh sistem imun. ',
        dosing:
          'Dewasa: 150-300 mg atau 400-450 mg (jika infeksi berat) tiap 6 jam.\nAnak: 3-6 mg/kgBB tiap 6 jam.',
        BPOM_id: 'DKL9513304801A1',
        require_prescription: true,
        price: 63515,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //38
      {
        name: 'Zithrolic 500 Mg 6 Kaplet',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 6,
        description:
          'Zithrolic Kaplet bermanfaat untuk mengobati infeksi bakteri pada berbagai bagian tubuh, seperti saluran pernapasan, paru-paru, mata, kulit, telinga, tenggorokan, dan amandel, serta infeksi menular seksual.\n Zithrolic Kaplet mengandung azithromycin yang merupakan antibiotik makrolida. Obat ini bekerja dengan cara menghentikan pertumbuhan bakteri, sehingga sistem kekebalan tubuh dapat lebih mudah membunuh bakteri.',
        dosing:
          'Kondisi: Pneumonia \nDewasa: 500 mg, 1 kali sehari pada hari pertama. Dilanjutkan dengan 250 mg, 1 kali sehari pada hari kedua sampai kelima.\nKondisi: Sinusitis\nDewasa: 500 mg, 1 kali sehari selama 3 hari. \nKondisi: Infeksi saluran pernapasan, infeksi kulit, dan infeksi jaringan lunak\nDewasa: 500 mg, 1 kali sehari, selama 3 hari. Dosis alternatif 500 mg pada hari pertama. Dilanjutkan dengan 250 mg pada hari kedua sampai kelima.\nKondisi: Infeksi genital akibat chlamydia trachomatis atau Haemophilus ducreyi (chancroid)\nDewasa: 1.000 mg sebagai dosis tunggal.\nKondisi: Gonore tanpa komplikasi\nDewasa: 1.000-2.000 mg sebagai dosis tunggal, dikombinasikan dengan ceftriaxone. ',
        BPOM_id: 'DKL2010811309A1',
        require_prescription: true,
        price: 311553,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //39
      {
        name: 'Ciflos 500 Mg 10 Tablet',
        packaging_type_id: 2,
        product_type_id: 4,
        net_content: 10,
        description:
          'Indikasi Umum\nMeruakan antibiotik golongan kuinolon yang berfungusi untuk mengatasi infeksi saluran pernapasan, infeksi saluran cerna, infeksi saluran emh, gonoge akut, tulang dan sendi, kulit serta jaringan lunak.',
        dosing:
          'Dewasa : Infeksi Saluran Kemih (ISK) ringan sampai dengan sedang : 250 mg, 2 x sehari. Infeksi Saluran Kemih (ISK) berat, prostatis kronik, infeksi GI : 500 mg, 2 x sehari. Infeksi saluran napas, tulang & sendi, kulit & jaringan lunak ringan sampai dengan sedang : 250-500 mg, 2 x sehari. Infeksi saluran napas, tulang & sendi, kulit & jaringan lunak berat : 500-750 mg, 2 x sehari. GO akut : 250 mg sebagai dosis tunggal. Osteomieletis akut : 750 mg, 2 x sehari.',
        BPOM_id: 'DKL9508003817B1',
        require_prescription: true,
        price: 214357,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //40
      {
        name: 'Pritalinc 500 Mg 10 Kapsul',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Pritalinc 500 Kapsul bermanfaat untuk mengatasi infeksi bakteri berat pada paru-paru, tulang, sendi, dan kulit.\nPritalinc 500 Kapsul adalah antibiotik dengan kandungan lincomycin. Obat ini bekerja dengan cara menghambat pertumbuhan bakteri atau langsung membunuh bakteri. Dengan begitu, bakteri dalam tubuh dapat lebih mudah untuk dikendalikan dan dibasmi oleh sistem kekebalan tubuh.\nPerlu diketahui bahwa antibiotik tidak dapat digunakan untuk mengobati infeksi virus, seperti flu atau pilek.',
        dosing:
          'Dewasa: 500 mg, 3-4 kali sehari.\nAnak-anak usia ≥1 bulan: 30–60 mg/kgBB per hari yang dibagi dalam 3-4 dosis.',
        BPOM_id: 'DKL9730905101B1',
        require_prescription: true,
        price: 28235,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //41
      {
        name: 'Nomika 50 Mg 10 Kapsul',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Nomika Kapsul adalah antibiotik untuk mengatasi penyakit akibat infeksi bakteri, seperti gonore, sifilis, atau jerawat yang parah.\nNomika Kapsul mengandung minocycline. Obat antibiotik ini bekerja dengan cara menghambat pembentukan protein yang penting untuk pertumbuhan bakteri. Dengan begitu, bakteri akan mati dan infeksi bisa teratasi.',
        dosing:
          'Kondisi: infeksi bakteri yang rentan dengan minocycline\nDewasa: dosis awal 200 mg, kemudian 100 mg setiap 12 jam.\nAnak usia di atas 8 tahun: dosis awal 4 mg/kgBB kemudian menjadi 2 mg/kg setiap 12 jam.\nKondisi: gonore pada pasien yang alergi terhadap penicillin\nDewasa: dosis awal 200 mg, kemudian 100 mg setiap 12 jam, selama minimal 4 hari\nKondisi: Karier bakteri meningococcal\nDewasa: 100 mg 12 jam sehari, selama 5 hari.\nKondisi: infeksi kulit karena Mycobacterium marinum\nDewasa: 100 mg 2 kali sehari, selama 6-8 minggu.\nKondisi: uretritis gonore tanpa komplikasi\nPria Dewasa: 100 mg 2 kali sehari, selama 5 hari.\nKondisi: Sifilis\nDewasa: 100 mg 2 kali sehari, selama 10-15 hari.',
        BPOM_id: 'DKL9409309601A1',
        require_prescription: true,
        price: 89208,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // susu------------------------------------------------------------------------
      //42
      {
        name: 'Ensure Vanilla 900 gr',
        packaging_type_id: 7,
        product_type_id: 3,
        net_content: 900,
        description:
          'Ensure Rasa Vanilla adalah susu bubuk yang bermanfaat untuk memenuhi kebutuhan nutrisi orang dewasa agar tetap sehat dan aktif sepanjang hari.\n\nEnsure Rasa Vanilla mengandung protein whey, kasein, dan soya yang mudah dicerna oleh tubuh. Susu ini juga kaya akan kalsium, vitamin D, serat FOS, omega 3 dan 6, serta 14 vitamin dan 9 mineral.\nKombinasi nutrisi dalam susu ini berguna untuk membangun massa otot, menguatkan tulang dan gigi, melancarkan pencernaan, meningkatkan daya tahan tubuh dan stamina, serta memelihara kesehatan tubuh secara keseluruhan. Susu ini juga rendah laktosa sehingga nyaman di perut.',
        dosing:
          'Konsumsi Ensure Rasa Vanilla 1–2 kali sehari. Susu ini bisa disajikan hangat atau dingin. Larutkan 5 sendok takar Ensure Rasa Vanilla ke dalam 200 ml air matang hangat, aduk hingga larut dan susu siap untuk diminum. Campur dengan air dingin bila ingin menyajikan dingin. Jangan lupa untuk menggunakan sendok takar yang tersedia dalam kemasan agar dosisnya tepat.',
        BPOM_id: 'ML567009043512',
        require_prescription: false,
        price: 332625,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //43
      {
        name: 'Nutribaby Royal Pepti Junior 400 gr',
        packaging_type_id: 7,
        product_type_id: 3,
        net_content: 400,
        description:
          'Nutribaby Royal Pepti Junior merupakan susu formula bayi untuk anak usia 0-12 bulan. Susu ini ditujukan untuk sindroma malabsorbsi dan alergi protein susu sapi. Susu ini mengandung Protein Terhidrolisat Ekstensif, bebas Laktosa, dan mengandung MCT (Trigliserida Rantai Sedang). Penggunaan susu ini harus dibawah pengawasan tenaga medis.',
        dosing:
          'Takaran susu formula bayi dapat dilihat pada Tabel Pemberian Formula.',
        BPOM_id: 'ML560604001656',
        require_prescription: false,
        price: 308278,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //44
      {
        name: 'PediaComplete Vanila 400 gr',
        packaging_type_id: 7,
        product_type_id: 3,
        net_content: 400,
        description:
          'PediaComplete Vanila merupakan susu pendukung asupan nutrisi untuk anak usia 1–10 tahun.\n\nPediaComplete Vanila bisa menjadi tambahan nutrisi dan diminum di antara waktu makan. Susu ini juga bisa dijadikan makanan utama bagi anak yang tidak bisa mengonsumsi makanan biasa.\n\nPediaComplete Vanila ditujukan anak yang kurang gizi atau anak yang mengalami penurunan asupan makanan akibat sakit atau kurang selera makan. Pastikan untuk berkonsultasi dengan dokter sebelum memberikan susu ini ke anak, agar mendapatkan dosis yang tepat untuk memenuhi kebutuhan gizi spesifik anak Anda.',
        dosing:
          'Anak usia 1–3 tahun: 5 sendok takar (49 gr) PediaComplete Vanilla dimasukkan ke dalam 190 ml air bersuhu ruangan atau air hangat. Konsumsi minuman ini 2 kali sehari.\nAnak usia 4–10 tahun: 5 sendok takar PediaComplete Vanilla dimasukkan ke dalam 190 ml air bersuhu ruangan atau air hangat. Konsumsi minuman ini 3 kali sehari. ',
        BPOM_id: 'ML562409057512',
        require_prescription: false,
        price: 231000,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //45
      {
        name: 'Diabetasol Rasa Vanila 180 gr',
        packaging_type_id: 2,
        product_type_id: 3,
        net_content: 180,
        description:
          'Diabetasol Rasa Vanilla bermanfaat sebagai sumber nutrisi yang dapat mengurangi terjadinya lonjakan gula darah tinggi setelah makan pada penderita diabetes. \n\nDiabetasol Rasa Vanilla adalah susu pengganti makanan dengan nutrisi lengkap dan seimbang. Susu ini juga mengandung vita digest pro, yaitu kombinasi karbohidrat lepas lambat yang dilengkapi dengan vitamin B dan magnesium, untuk membantu menstabilkan gula darah. ',
        dosing:
          'Tuangkan sebanyak 4 sendok takar ke dalam 200 ml air panas atau hangat, aduk rata.',
        BPOM_id: 'MD867010206281',
        require_prescription: false,
        price: 58253,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //46
      {
        name: 'Entrasol Gold Vanila 185 gr',
        packaging_type_id: 3,
        product_type_id: 3,
        net_content: 185,
        description:
          'Entrasol Gold Vanila mengandung kalsium, vitamin D, magnesium, serat, omega 3 dan 6, yang dilengkapi dengan ekstrak buah zaitun serta 10 vitamin dan 5 mineral. Kombinasi nutrisi dalam susu ini berguna untuk menguatkan tulang dan gigi, mencegah osteoporosis, serta memelihara kesehatan tubuh secara keseluruhan. Dengan begitu, tubuh tetap sehat dan aktif di masa tua.',
        dosing:
          'Larutkan 3 sendok makan (35 gram) Entrasol Gold Vanila ke dalam 200 ml air matang hangat, aduk hingga larut dan susu siap untuk diminum. Setelah dibuka, lipat polybag dan tutup rapat-rapat. Habiskan Entrasol Gold Vanila dalam waktu kurang dari satu bulan setelah kemasan dibuka.',
        BPOM_id: 'MD 805010329281',
        require_prescription: false,
        price: 45100,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // obat batuk
      //47
      {
        name: 'Acetin 200 Mg 10 Kapsul',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Kandungan acetylcysteine dalam Acetin Kapsul bekerja sebagai mukolitik atau pengencer dahak, sehingga dahak bisa lebih mudah dikeluarkan melalui batuk. Obat ini dapat diberikan pada beberapa kondisi, seperti bronkitis, bronkiektasis, atau penyakit paru obstruktif kronik (PPOK).',
        dosing:
          'Dewasa dan anak usia >14 tahun: 1 kapsul, 2-3 kali sehari.\nAnak usia 6-14 tahun: 1 kapsul, 2 kali sehari.',
        BPOM_id: 'DKL2022259301A1',
        require_prescription: true,
        price: 36523,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //48
      {
        name: 'Benadryl Batuk Berdahak Sirup 50 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 50,
        description:
          'Benadryl Batuk Berdahak Sirup merupakan obat yang digunakan untuk mengurangi dan mengencerkan dahak pada saluran pernapasan. Benadryl Batuk Berdahak mengandung dual zat aktif Bromhexin HCl dan Guaifenesin yang bekerja sebagai iritan pada saluran pernafasan di mana saat batuk, volume mukus ditingkatkan pada saluran napas serta menurunkan viskositasnya (menjadi lebih encer) sehingga dahak/lendir lebih mudah dikeluarkan dari saluran pernapasan. Fungsi kedua zat tersebut adalah ekspektoran yang dapat mengencerkan dahak atau lendir pada saluran pernafasan sehingga lebih mudah dikeluarkan bersamaan dengan batuk.',
        dosing:
          'Dewasa dan anak diatas 12 tahun: 10 ml, diberikan 3 kali per hari Anak 6-12 tahun: 5 ml, diberikan 3 kali per hari Anak 2-6 tahun: 2.5 ml, diberikan 3 kali per hari Anak di bawah 2 tahun sesuai dengan rekomendasi dokter',
        BPOM_id: 'DTL1541200337A1',
        require_prescription: false,
        price: 30397,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //49
      {
        name: 'Bisolvon 8 Mg 10 Tablet',
        packaging_type_id: 5,
        product_type_id: 1,
        net_content: 10,
        description:
          'Bisolvon 100 Tablet 8 Mg berfungsi mengencerkan dahak di saluran pernapasan dengan cara menghambat kerja sel yang memprodusi dahak. Dengan begitu, dahak menjadi encer dan mudah untuk dikeluarkan.',
        dosing:
          'Dewasa dan anak usia >10 tahun: 1 tablet, 3 kali sehari\nAnak-anak usia 6-10 tahun: ½ tablet, 3 kali sehari\nAnak-anak usia 2-5 tahun: ½ tablet, 2 kali sehari',
        BPOM_id: 'DTL1821207010A1',
        require_prescription: false,
        price: 28320,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //50
      {
        name: 'Cohistan Ekspektoran Sirup 60 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 60,
        description:
          'Cohistan Expectoran mengandung guaifenesin dan chlorpheniramine. Guaifenesin bekerja dengan mengencerkan dahak, sehingga dahak bisa lebih mudah dikeluarkan dari saluran pernapasan. Sementara itu, chlorpheniramine bekerja dengan menghambat kerja histamin, yaitu senyawa yang menyebabkan munculnya gejala alergi.',
        dosing:
          'Dewasa: 1 sendok makan (15 ml), 3-4 kali sehari.\nAnak usia 2-6 tahun: 1 sendok teh (5 ml), 3-4 kali sehari.\nAnak usia 7-12 tahun: ½ sendok makan (7,5 ml), 3-4 kali sehari.',
        BPOM_id: 'DTL2004530137A1',
        require_prescription: false,
        price: 28738,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //51
      {
        name: 'Epexol Drops 20 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 20,
        description:
          'Epexol Drops mengandung ambroxol yang merupakan pengencer dahak (mukolitik). Ambroxol bekerja dengan cara memecah serat asam mukopolisakarida di dalam dahak, sehingga dahak menjadi lebih encer dan mudah dikeluarkan saat batuk.',
        dosing:
          'Anak usia 1–2 tahun: 7,5 mg (0,5 ml), 2 kali sehari.\nAnak usia 2–5 tahun: 7,5 mg (0,5 ml), 3 kali sehari.\nAnak usia 6–11 tahun: 15 mg (1 ml), 2–3 kali sehari.\nDewasa: 30 mg (2 ml), 2–3 kali sehari. Dosis dapat ditingkatkan hingga 60 mg (4 ml), 2 kali sehari.',
        BPOM_id: 'DKL1022248336A1',
        require_prescription: true,
        price: 60032,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // obat sakit kepala
      //52
      {
        name: 'Antrain 500 Mg 10 Tablet',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Tablet untuk membantu mengurangi rasa nyeri, terutama nyeri pasca operasi',
        dosing:
          'Dewasa : 1 tablet jika sakit timbul, berikutnya 1 tablet tiap 6-8 jam, maksimum 4 tablet sehari.',
        BPOM_id: 'DKL7617611210A1',
        require_prescription: true,
        price: 34754,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //53
      {
        name: 'Biogesic 500 Mg 4 Tablet',
        packaging_type_id: 5,
        product_type_id: 1,
        net_content: 4,
        description:
          'Biogesic 500 Mg 4 Tablet bekerja dengan cara mengurangi produksi zat penyebab peradangan, yaitu prostaglandin. Penurunan kadar prostaglandin di dalam tubuh akan membuat tanda peradangan seperti demam dan nyeri berkurang.',
        dosing:
          'Dewasa dan anak-anak usia12 tahun ke atas: 1-2 tablet, 3-4 kali sehari.\nAnak-anak usia 6-12 tahun: ½-1 tablet, 3-4 kali sehari.',
        BPOM_id: 'DBL8814702510A3',
        require_prescription: false,
        price: 2352,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //54
      {
        name: 'Bodrex Extra 4 Kaplet',
        packaging_type_id: 5,
        product_type_id: 1,
        net_content: 4,
        description:
          'Kandungan ibuprofen, paracetamol, dan kafein yang terkandung di dalam Bodrex Extra Kaplet bekerja secara sinergis meredakan nyeri akibat sakit kepala.',
        dosing: 'Dosis Bodrex Extra Kaplet adalah 1-2 tablet, 3-4 kali sehari',
        BPOM_id: 'DTL0622719204A1',
        require_prescription: false,
        price: 2420,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //55
      {
        name: 'Cargesik 500 Mg 10 Kaplet',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Cargesik Kaplet mengandung asam mefenamat (mefenamic acid) yang bekerja dengan menghambat enzim yang berperan dalam pembentukan prostaglandin. Berkurangnya kadar prostaglandin dapat meredakan gejala radang, seperti nyeri, kemerahan, atau bengkak.',
        dosing:
          'Dosis umum Cargesik Kaplet untuk meredakan nyeri akibat sakit gigi, haid, atau radang sendi, seperti osteoarthritis dan rheumatoid arthritis, untuk dewasa dan anak usia 14 tahun ke atas adalah 500 mg, 3 kali sehari. ',
        BPOM_id: 'DKL9323402504A1',
        require_prescription: true,
        price: 6440,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //56
      {
        name: 'Exedra Rema 10 Kaplet',
        packaging_type_id: 5,
        product_type_id: 1,
        net_content: 10,
        description:
          'Exedra Rema 10 Kaplet mengandung ibuprofen dan paracetamol. Ibuprofen dan paracetamol merupakan obat dengan efek analgetik dan antipiretik, sehingga bisa meredakan demam dan nyeri. ',
        dosing: 'Dosis 1 kaplet, 3–4 kali sehari. ',
        BPOM_id: 'DTL1840403204A1',
        require_prescription: false,
        price: 18601,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Obat sakit tenggorokan
      {
        //57
        name: 'Cooling 5 Antiseptik Spray Cappuccino 15 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 15,
        description:
          'Coolling 5 Antiseptik Mouth and Throat Spray Cappuccino 15 Ml juga bisa digunakan untuk meredakan sariawan dan mengurangi bau mulut yang tidak sedap. ',
        dosing:
          'Semprotkan 2-3 kali ke arah tenggorokan atau area mulut. Semprotan dapat diulang tiap 2 jam sampai gejala reda.',
        BPOM_id: 'DBL1233526035A1',
        require_prescription: false,
        price: 42427,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //58
        name: 'Degirol 0,25 Mg 10 Tablet',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 10,
        description:
          'Degirol 0,25 mg Tablet mengandung bahan aktif dequalinium chloride. Dequalinium chloride memiliki sifat antiseptik yang bekerja dengan cara membunuh bakteri dan jamur penyebab infeksi ringan pada mulut dan tenggorokan. ',
        dosing:
          '1 tablet isap, 3–4 kali sehari atau sesuai petunjuk dokter. Dosis maksimal 8 tablet per hari.',
        BPOM_id: 'DBL9104508712A1',
        require_prescription: false,
        price: 12760,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //59
        name: 'Larutan Penyegar Cap Badak Botol 200 Ml',
        packaging_type_id: 1,
        product_type_id: 2,
        net_content: 200,
        description:
          'Larutan Penyegar Cap Badak Botol mengandung gypsum fibrosum. Bahan ini dipercaya dapat mengurangi gejala panas dalam, seperti rasa tidak nyaman di tenggorokan, sakit ketika menelan, bibir pecah-pecah, sariawan, dan bau mulut.',
        dosing:
          'Dewasa: Untuk pengobatan, minum 100–200 ml, 3 kali sehari. Untuk pencegahan, minum 200 ml 1 kali sehari.\nAnak-anak: Untuk pengobatan, minum 50–100 ml, 3 kali sehari. Untuk pencegahan, minum 100 ml, 1 kali sehari.',
        BPOM_id: 'DTR112627351',
        require_prescription: false,
        price: 4494,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //60
        name: 'Obat Sariawan Hau Fung San 1,2 gr',
        packaging_type_id: 1,
        product_type_id: 3,
        net_content: 1.2,
        description:
          'Obat Sakit Tenggorokan Cheng Sie Lung Hau Feng Yao San terbuat dari bahan herbal yang memiliki efek antiradang. Berkat efek dari bahan herbal tersebut, obat ini dipercaya dapat mengurangi nyeri akibat sariawan, serta meredakan radang tenggorokan atau sakit gigi. ',
        dosing:
          'Taburkan Obat Sakit Tenggorokan Cheng Sie Lung Hau Feng Yao San sedikit ke dalam mulut atau langsung pada sariawan, 2-3 kali tiap jam.',
        BPOM_id: 'TR183212841',
        require_prescription: false,
        price: 7159,
        weight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //61
        name: 'Tantum Lozenges 6 Tablet',
        packaging_type_id: 2,
        product_type_id: 1,
        net_content: 6,
        description:
          'Tantum Lozenge merupakan tablet hisap rasa mint yang mengandung benzydamine hydrochloride. Benzydamine bekerja dengan cara mengurangi produksi zat yang menyebabkan peradangan dan nyeri.',
        dosing:
          'Dosis untuk dewasa dan anak usia 6 tahun ke atas: 1 tablet isap, 3 kali sehari.',
        BPOM_id: 'DTL7224216312A1',
        require_prescription: false,
        price: 23983,
        weight: 100,
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
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options);
    await sequelize.query('TRUNCATE TABLE products', options);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options);
  },
};
