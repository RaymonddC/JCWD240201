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

    await queryInterface.bulkInsert(
      'products',
      [
        // obat mata-------------------------------------------------------------------------------------
        {
          name: 'Blecidex Tetes Mata/Telinga 5 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 5,
          desrcription:
            'Aturan pakai\r\nTeteskan pada mata atau telinga yang sakit. Hindari kontak langsung ujung penetes dengan mata, telinga, atau benda lain agar obat tidak terkontaminasi. Jangan digunakan lebih dari 7 hari.\r\n\r\nPerhatian\r\nIbu hamil, ibu menyusui, bayi, dan anak. Tidak boleh digunakan pada luka terbuka atau kulit yang mengalami kerusakan.\r\n\r\nEfek samping\r\nPenglihatan buram sementara, mata terasa panas atau perih, iritasi, dan rasa gatal.',
          dosing:
            'Untuk mata: 1-2 tetes, 6 kali sehari.\r\nUntuk telinga: 2-3 tetes, 3-4 kali sehari.',
          BPOM_id: 'DKL0022231660A1',
          require_prescription: true,
          price: 80743,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Asthenof Tetes Mata Minidose 0,6 Ml 5 Ampul',
          packaging_type_id: 2,
          product_type_id: 4,
          net_content: 5,
          desrcription:
            'Cendo Asthenof Tetes Mata Minidose 0,6 ml bermanfaat untuk mengatasi mata merah yang disebabkan oleh iritasi ringan. \r\n\r\nCendo Asthenof Tetes Mata Minidose 0,6 ml mengandung bahan aktif oxymetazoline HCl. Obat ini bekerja dengan cara menyempitkan pemburuh darah kecil yang ada di bagian putih mata (sklera), sehingga dapat meredakan mata merah.',
          dosing: '1–2 tetes pada mata yang mengalami keluhan.',
          BPOM_id: 'DTL7803812846A1',
          require_prescription: false,
          price: 31680,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Catarlent Tetes Mata 15 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 15,
          desrcription:
            'Cendo Catarlent Eye Drop 15 Ml bermanfaat untuk membantu meredakan kekeruhan pada cairan mata. \r\n\r\nCara kerja Cendo Catarlent Eye Drop 15 Ml belum diketahui secara pasti. Namun, menurut sebuah penelitian, kalium iodida mempunyai efek untuk membunuh mikroba.',
          dosing:
            'Gunakan Cendo Catarlent Eye Drop 15 Ml sebanyak 1-2 tetes, 3 kali sehari, atau sesuai petunjuk dokter.',
          BPOM_id: 'DKL7603811646A1',
          require_prescription: true,
          price: 43465,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Fenicol 0,25% Tetes Mata 5 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 5,
          desrcription:
            'Cendo Fenicol 0,25% Sterile Eye Drops-Tetes Mata 5 Ml bermanfaat untuk mengobati konjungtivitis akibat infeksi bakteri pada mata. \r\n\r\nCendo Fenicol 0,25% Sterile Eye Drops-Tetes Mata 5 Ml bekerja dengan cara membasmi bakteri penyebab infeksi dan menghentikan pertumbuhannya.',
          dosing:
            'Gunakan Cendo Fenicol 0,25% Sterile Eye Drops-Tetes Mata 5 Ml 1 tetes setiap 2 jam, selama 2 hari pertama. Setelah itu, kurangi dosis menjadi 1 tetes, 3-4 kali per hari, selama 3 hari.\r\n',
          BPOM_id: 'DKL7803809346C1',
          require_prescription: true,
          price: 33144,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Fenicol Salep Mata 3,5 gr',
          packaging_type_id: 4,
          product_type_id: 3,
          net_content: 3.5,
          desrcription:
            'Cendo Fenicol Eye Ointment-Salep Mata 3,5 gr bermanfaat untuk mengobati konjungtivitis akibat infeksi bakteri pada mata. \r\n\r\nCendo Fenicol Eye Ointment-Salep Mata 3,5 gr bekerja dengan cara membasmi bakteri penyebab infeksi dan menghentikan pertumbuhannya.',
          dosing:
            'Oleskan Cendo Fenicol Eye Ointment-Salep Mata 3,5 gr sebanyak 4-5 kali sehari hingga infeksi sembuh, atau sesuai anjuran dokter. Jangan menggunakan obat lebih dari 1 minggu, kecuali atas saran dokter.',
          BPOM_id: 'DKL7803814631A1',
          require_prescription: true,
          price: 31574,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Cenfresh Tetes Mata Minidose 0,6 Ml 5 Ampul',
          packaging_type_id: 2,
          product_type_id: 4,
          net_content: 5,
          desrcription:
            'Cendo Cenfresh Tetes Mata bekerja dengan membentuk lapisan pelindung pada permukaan mata yang melapisi dan membasahi mata agar tetap sehat dan nyaman. Obat ini menenangkan dan menjaga kelembapan mata, sehingga dapat mengurangi gejala mata kering seperti rasa terbakar atau gatal pada mata.',
          dosing:
            'Teteskan Cendo Cenfresh Tetes Mata sebanyak 1–2 tetes, sebanyak 3–4 kali sehari pada mata yang sakit.',
          BPOM_id: 'DTL0203808746A1',
          require_prescription: false,
          price: 29700,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Hyalub Tetes Mata Minidose 0,6 Ml 5 Ampul',
          packaging_type_id: 2,
          product_type_id: 4,
          net_content: 5,
          desrcription:
            'Cendo Hyalub Tetes Mata Minidose bermanfaat untuk menghilangkan rasa terbakar, iritasi, atau ketidaknyamanan karena mata kering dan juga membantu pemulihan cedera pada mata seperti abrasi kornea.\r\n\r\nCendo Hyalub Tetes Mata Minidose mengandung sodium hyaluronate yang memiliki kemampuan menyimpan air dengan baik. Setiap molekul sodium hyaluronate dapat mengikat sejumlah molekul air, sehingga kelembapan mata dapat terjaga.',
          dosing:
            'Teteskan Cendo Hyalub Tetes Mata Minidose sebanyak 1 tetes, 5–6 kali sehari pada mata yang sakit.',
          BPOM_id: 'DKL1003812946A1',
          require_prescription: true,
          price: 82327,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sanbe Tears Tetes Mata 8 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 8,
          desrcription:
            'Meredakan sementara ketidak-nyamanan pada mata akibat iritasi ringan atau terpapar pada angin atau sinar matahari dan kekeringan pada mata',
          dosing: '1-2 tetes sesuai anjuran',
          BPOM_id: 'DTL9922230946A1',
          require_prescription: false,
          price: 33884,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Insto Dry Eyes 7,5 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 7.5,
          desrcription:
            'Insto Dry Eyes Sterile Eye Drops 7,5 Ml bermanfaat untuk membantu mengatasi mata kering, meredakan iritasi akibat kurangnya produksi air mata. Selain itu, obat ini juga digunakan untuk menjadi pelumas mata palsu. \r\n\r\nInsto Dry Eyes Sterile Eye Drops 7,5 Ml mengandung bahan aktif hydroxypropyl methylcellulose yang akan memberikan efek sebagai pelumas mata, sehingga bisa meredakan keluhan akibat mata kering, seperti rasa gatal atau sensasi mengganjal di mata. ',
          dosing:
            '1–2 tetes di tiap mata, 3 kali sehari atau sesuai anjuran dokter. ',
          BPOM_id: 'DTL1438202146A1',
          require_prescription: false,
          price: 17974,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rohto Dryfresh 7 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 7,
          desrcription:
            'Rohto Dryfresh bermanfaat untuk mengatasi gejala mata kering dan mencegah iritasi akibat kurangnya produksi air mata. Selain itu, obat ini juga dapat digunakan untuk menjadi pelumas pada mata palsu. \r\n\r\nRohto Dryfresh mengandung bahan aktif hydroxypropyl methylcellulose (hypromellose) yang akan melumasi dan melembapkan mata. Obat ini dapat meredakan keluhan akibat mata kering, seperti rasa gatal atau sensasi mengganjal di mata, dan melindungi mata dari cedera dan infeksi.',
          dosing:
            'Dosis umum 1–2 tetes, 3 kali sehari atau sesuai anjuran dokter.',
          BPOM_id: 'DTL1840000946A1',
          require_prescription: false,
          price: 19124,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rohto Tetes Mata 7 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 7,
          desrcription:
            'Rohto Tetes Mata bermanfaat untuk mengatasi mata merah karena iritasi ringan yang disebabkan oleh asap, angin, sinar matahari, suhu dingin, pemakaian lensa kontak, atau aktivitas berenang maupun membaca.\r\n\r\nRohto Tetes Mata mengandung bahan aktif Tetrahydrozoline HCl. Tetrahydrozoline HCl bekerja dengan cara mengecilkan ukuran pembuluh darah di mata untuk sementara waktu agar mata merah mereda.',
          dosing:
            'Teteskan 1-2 tetes pada mata yang sakit atau kedua mata, 2-3 kali sehari.',
          BPOM_id: 'DTL1140000246A1',
          require_prescription: false,
          price: 13690,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Insto Regular Tetes Mata 15 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 15,
          desrcription:
            'Insto Regular Tetes Mata 15 Ml bermanfaat untuk mengatasi kemerahan dan rasa perih di mata yang disebabkan oleh iritasi ringan karena debu, asap, atau angin. Selain itu, obat ini juga bisa digunakan setelah berenang. \r\n\r\nInsto Regular Tetes Mata 15 Ml mengandung tetrahydrozoline HCl yang merupakan dekongestan. Obat ini bekerja dengan mempersempit pembuluh darah di mata untuk sementara waktu. Dengan begitu, kemerahan pada mata akan mereda. ',
          dosing:
            '2-3 tetes pada tiap mata, sebanyak 3 atau 4 kali sehari atau sesuai anjuran dokter. ',
          BPOM_id: 'DTL1438202046A1',
          require_prescription: false,
          price: 26290,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rohto V- Extra Tetes Mata 7 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 7,
          desrcription:
            'Rohto V- Extra Tetes Mata 7 Ml bermanfaat untuk meredakan mata merah karena iritasi ringan.\r\n\r\nRohto V- Extra Tetes Mata 7 Ml juga dapat digunakan untuk mengurangi mata kering atau sebagai pelindung terhadap iritasi lebih lanjut. Obat tetes mata ini mengandung bahan aktif Tetrahydrozoline HCl dan Macrogol 400 yang menjaga mata tetap lembab.',
          dosing:
            'Teteskan 1–2 tetes 3–4 kali sehari atau sesuai anjuran dokter.\r\n',
          BPOM_id: 'DTL1840001046A1',
          require_prescription: false,
          price: 20378,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cendo Xitrol Tetes Mata Minidose 0,6 Ml 5 Ampul',
          packaging_type_id: 2,
          product_type_id: 4,
          net_content: 5,
          desrcription:
            'Cendo Xitrol Minidose 0,6 Ml bermanfaat untuk mengobati infeksi mata yang disertai dengan peradangan. \r\n\r\nCendo Xitrol Minidose 0,6 Ml mengandung dexamethasone sodium phosphate, neomycin sulfate, dan polymyxin B sulfate. Polymixin B dan neomycin merupakan antibiotik yang dapat membunuh serta menghambat pertumbuhan bakteri, sedangkan dexamethasone adalah kortikosteroid yang dapat meredakan peradangan.',
          dosing:
            'Gunakan Cendo Xitrol Minidose 0,6 Ml sebanyak 1-2 tetes, tiap 1-2 jam sekali. Dosis dapat dikurangi menjadi 1-2 tetes setiap 4-6 jam sekali jika keluhan sudah membaik.',
          BPOM_id: 'DKL7203809746A1',
          require_prescription: true,
          price: 34953,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Callusol Cairan Obat Luar 10 Ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 10,
          desrcription:
            'Callusol Cairan Obat Luar adalah obat yang bermanfaat untuk menghilangkan kutil, mata ikan, atau kapalan.\r\n\r\nCallusol Cairan Obat Luar bekerja dengan cara melunakkan bagian kulit yang mengeras akibat mata ikan, kutil, atau kapalan, sehingga mempercepat proses pengelupasan dan penggantian sel kulit.',
          dosing:
            'Oleskan Callusol Cairan Obat Luar pada bagian kulit yang bermasalah sebanyak 1–2 kali sehari, hingga kutil, mata ikan, atau kapalan terlepas.',
          BPOM_id: 'DBL0831528141A1',
          require_prescription: false,
          price: 38500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // obat flu ----------------------------------------------------------------------------
        {
          name: 'Ceteme 4 Mg 12 Tablet',
          packaging_type_id: 2,
          product_type_id: 1,
          net_content: 12,
          desrcription:
            'Ceteme Tablet bermanfaat untuk meredakan gejala alergi pada kondisi rhinitis, 		rhinitis alergi, atau biduran. Gejala alergi yang dimaksud misalnya, mata berair, hidung tersumbat, pilek, bersin, batuk, serta gatal pada kulit, hidung, mata, dan tenggorokan.\nCeteme Tablet mengandung chlorpheniramine maleate yang bekerja dengan cara menghambat kerja histamin, yaitu senyawa yang bisa menyebabkan munculnya gejala alergi saat seseorang terpapar zat atau bahan pemicu alergi (alergen). Dengan begitu, gejala alergi dapat mereda.',
          dosing:
            'Dewasa dan anak usia 12 tahun ke atas: 1 tablet, 3-4 kali sehari.\nAnak-anak usia 6-12 tahun: ½ tablet, 3-4 kali sehari.\nAnak-anak usia 2-6 tahun: ¼ tablet, 3-4 kali sehari.',
          BPOM_id: 'DTL0704002010A1',
          require_prescription: false,
          price: 1837,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cerini 10mg/ml Drop 20ml',
          packaging_type_id: 1,
          product_type_id: 2,
          net_content: 20,
          desrcription:
            'Cerini Sirup bermanfaat meredakan gejala atau keluhan akibat reaksi alergi, seperti ruam kulit, biduran, bersin-bersin, serta rasa gatal di kulit, hidung, atau tenggorokan.\nCerini Sirup bekerja dengan cara memblokir histamin. Histamin adalah senyawa yang meningkat jumlahnya dan menimbulkan gejala dan reaksi alergi saat tubuh terpapar alergen (zat pemicu alergi).\nPerlu diketahui bahwa cetirizine dalam Cerini Sirup tidak bisa menyembuhkan alergi. Cara terbaik untuk mencegah timbulnya reaksi alergi adalah dengan menghindari paparan zat pemicu alergi.',
          dosing:
            'Dewasa dan anak usia di atas 12 tahun: 10 ml per hari.\nAnak usia 6-12 tahun: 10 ml per hari atau 5 ml 2 kali sehari.\nAnak usia 2-6 tahun: 5 ml sehari sekali atau 2,5 ml 2 kali sehari',
          BPOM_id: 'DTL1422252537A1',
          require_prescription: true,
          price: 63952,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Panadol Anak-Anak Rasa Cherry 10 Tablet',
          packaging_type_id: 2,
          product_type_id: 1,
          net_content: 10,
          desrcription:
            'Panadol Anak-Anak 10 Tablet Kunyah Rasa Cherry bermanfaat untuk menurunkan demam dan meredakan nyeri, seperti sakit kepala dan sakit gigi.\nPanadol Anak-Anak 10 Tablet Kunyah Rasa Cherry bekerja dengan cara mengurangi produksi zat penyebab peradangan, yaitu prostaglandin. Penurunan kadar prostaglandin di dalam tubuh akan membuat tanda peradangan seperti demam dan nyeri berkurang.',
          dosing:
            'Anak-anak usia 6-12 tahun: 2-4 tablet, 3-4 kali sehari.\nAnak-anak usia 2-5 tahun: 1-2 tablet, 3-4 kali sehari.',
          BPOM_id: 'DBL0124501963B1',
          require_prescription: false,
          price: 18625,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Trisela 10 Mg 10 Tablet',
          packaging_type_id: 2,
          product_type_id: 1,
          net_content: 10,
          desrcription:
            'Trisela merupakan obat yang digunakan untuk mengurangi rasa gatal yang dapat diikuti oleh ruam (gatal) di bagian tubuh tertentu karena suatu alergi.\nObat golongan antihistamin ini bekerja dengan mengikat reseptor histamin supaya terjadi penghambatan efek histamin pada tubuh dan tidak terjadi alergi. Selain itu, obat ini juga dapat menimbulkan efek sedasi atau menimbulkan kantuk.',
          dosing:
            '6-8 tahun : 5ml diminum bila perlu satu dosis tiap 4 jam, tidak lebih dari 5x/hari',
          BPOM_id: 'DTL1306314810A1',
          require_prescription: false,
          price: 64790,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tolak Angin Cair Flu Sido Muncul 15 Ml',
          packaging_type_id: 3,
          product_type_id: 2,
          net_content: 15,
          desrcription:
            'Tolak Angin Cair Flu 15 Ml bermanfaat untuk meringankan gejala selesma atau flu, seperti hidung tersumbat, pilek, sakit kepala dan badan terasa pegal.\nTolak Angin Cair Flu 15 Ml mengandung beberapa bahan herbal, seperti buah adas, kayu ules, daun cengkeh, jahe, daun mint, echinacea, meniran, valerian, dan panax ginseng. Kombinasi semua bahan tersebut dipercaya bisa meredakan gejala selesma sekaligus memelihara daya tahan tubuh.',
          dosing: '3-4x sehari 1 sachet',
          BPOM_id: 'TR032622221',
          require_prescription: false,
          price: 4070,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // obat vitamin ------------------------------------------------------------------------------------------------
        {
          name: 'Vitacimin Lemon 2 Tablet',
          packaging_type_id: 2,
          product_type_id: 1,
          net_content: 2,
          desrcription:
            'Vitacimin Lemon 2 Tablet merupakan suplemen makanan yang mengandung vitamin C. Vitamin ini membantu untuk menjaga daya tahan tubuh.',
          dosing: '1-2 tablet per hari',
          BPOM_id: 'SD021501851',
          require_prescription: false,
          price: 2090,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vitamin C IPI 50 Mg 90 Tablet',
          packaging_type_id: 1,
          product_type_id: 1,
          net_content: 90,
          desrcription:
            'Vitamin C IPI Tablet bermanfaat mencegah dan mengatasi kekurangan vitamin C. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut (scurvy). Selain itu, vitamin C juga memiliki efek antioksidan yang dapat membantu tubuh melawan radikal bebas.\nVitamin C berperan penting dalam berbagai proses yang terjadi di dalam tubuh, termasuk menjaga dan mengoptimalkan daya tahan tubuh, meningkatkan penyerapan zat besi, serta pembentukan kolagen, protein, dan neurotransmiter. Kekurangan vitamin C bisa menyebabkan terjadinya penyakit skorbut.',
          dosing: '1 x sehari 1 tablet atau sesuai pada petunjuk kemasan.',
          BPOM_id: 'SD141546241',
          require_prescription: false,
          price: 12153,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vitamin A IPI 45 Tablet',
          packaging_type_id: 1,
          product_type_id: 1,
          net_content: 45,
          desrcription:
            'Vitamin A IPI Tablet bermanfaat untuk membantu memenuhi kebutuhan vitamin A.\nVitamin A berperan penting dalam kesehatan mata, sistem imun, dan pertumbuhan sel. Selain itu, suplemen vitamin A bisa digunakan dalam pengobatan campak dan defisiensi (kekurangan) vitamin A, termasuk xerophthalmia.',
          dosing: 'Dewasa dan anak-anak: 1 tablet sehari.',
          BPOM_id: 'SD151546691',
          require_prescription: false,
          price: 6600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vitamin A 200000 IU 50 Kapsul',
          packaging_type_id: 1,
          product_type_id: 1,
          net_content: 50,
          desrcription:
            'Vitamin A 200.000 IU 50 Kapsul merupakan salah satu vitamin yang berfungsi untuk perkembangan organ tubuh seperti mata, kulit dan sistem kekebalan tubuh.',
          dosing: '1 tablet sehari.',
          BPOM_id: 'GBL9532300102A1',
          require_prescription: false,
          price: 64516,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vitamin B Complex IPI 45 Tablet',
          packaging_type_id: 1,
          product_type_id: 1,
          net_content: 45,
          desrcription:
            'Vitamin B Complex Ipi digunakan untuk mencegah dan mengobati kekurangan vitamin B complex. Cara kerja vitamin ini adalah mensuplai kebutuhan vitamin B complex yang penting untuk metabolisme karbohidrat dan protein dalam tubuh. ',
          dosing: '1 tablet sehari',
          BPOM_id: 'SD141546221',
          require_prescription: false,
          price: 8839,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Obat Demam --------------------------------------------------------------
        {
          name: 'Bodrexin 80 Mg 6 Tablet',
          packaging_type_id: 1,
          product_type_id: 1,
          net_content: 6,
          desrcription:
            'Bodrexin 80 mg dapat menurunkan demam dan meringankan rasa nyeri pada anak-anak dengan rasa buah yang enak.',
          dosing:
            'Anak 2-3 Tahun : 1 tablet. Anak 4-5 Tahun : 2 tablet. Anak 6-8 Tahun : 3 tablet. Jika perlu bisa diulang tiap 4 jam atau menurut petunjuk dokter.',
          BPOM_id: 'DBL7222708910A1',
          require_prescription: false,
          price: 1879,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Biogesic 500 Mg 4 Tablet',
          packaging_type_id: 5(blister),
          product_type_id: 1,
          net_content: 4,
          desrcription:
            'Biogesic 500 Mg 4 Tablet bermanfaat untuk menurunkan demam dan meredakan nyeri, seperti sakit kepala dan sakit gigi.\nBiogesic 500 Mg 4 Tablet bekerja dengan cara mengurangi produksi zat penyebab peradangan, yaitu prostaglandin. Penurunan kadar prostaglandin di dalam tubuh akan membuat tanda peradangan seperti demam dan nyeri berkurang.',
          dosing:
            '> 12 tahun : 3-4 x sehari 1-2 tablet, 6-12 tahun : 3-4 x sehari 1/2-1 tablet',
          BPOM_id: 'DBL8814702510A3',
          require_prescription: false,
          price: 2352,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Dumin 500 Mg 10 Tablet',
          packaging_type_id: 5(blister),
          product_type_id: 1,
          net_content: 10,
          desrcription:
            'Dumin 500 mg Tablet bermanfaat untuk menurunkan demam dan meredakan nyeri, seperti sakit kepala dan sakit gigi.\nDumin 500 mg Tablet bekerja dengan cara mengurangi produksi zat penyebab peradangan, yaitu prostaglandin. Penurunan kadar prostaglandin di dalam tubuh akan membuat tanda peradangan seperti demam dan nyeri berkurang.',
          dosing:
            'Dewasa: 1 tablet, 3-4 kali sehari.\nAnak-anak usia 6-12 tahun: ½ tablet, 3-4 kali sehari atau sesuai petunjuk dokter',
          BPOM_id: 'DBL8305501304A1',
          require_prescription: false,
          price: 8140,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Farsifen 400 Mg 10 Tablet',
          packaging_type_id: 2,
          product_type_id: 1,
          net_content: 10,
          desrcription:
            'Farsifen 400 mg Tablet bermanfaat untuk meredakan nyeri dan menurunkan demam.\nFarsifen 400 mg Tablet mengandung ibuprofen yang bekerja dengan cara menghambat zat pemicu peradangan di dalam tubuh, yaitu prostaglandin. Dengan berkurangnya peradangan, rasa nyeri juga akan berkurang dan demam akan turun.',
          dosing:
            'Dewasa dan anak usia >12 tahun: 200–400 mg, 3–4 kali sehari. Dosis maksimal 2.400 mg per hari.',
          BPOM_id: 'DKL9409204409A1',
          require_prescription: true,
          price: 11424,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Inzana 4 Tablet',
          packaging_type_id: 0,
          product_type_id: 0,
          net_content: 4,
          desrcription:
            'Inzana Tablet Kunyah bermanfaat untuk mengurangi rasa sakit dan menurunkan demam pada anak.\nObat ini bekerja dengan cara menghambat enzim alami dan mengencerkan darah di dalam tubuh. Dengan begitu, rasa sakit dapat berkurang dan penggumpalan darah dapat dicegah.',
          dosing:
            'Anak usia 1-2 tahun: 1 tablet, 3-4 kali sehari\nAnak usia 3-5 tahun: 1Â½â€“2 tablet, 3-4 kali sehari\nAnak usia 6-12 tahun: 2Â½â€“5 tablet, 3-4 kali sehari',
          BPOM_id: 'DBL7813003663A1',
          require_prescription: false,
          price: 1307,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // jamu -------------------------------------------------------------------------------
        {
          name: 'Tolak Angin Plus Madu Sido Muncul 15 Ml 5 Sachet',
          packaging_type_id: 3,
          product_type_id: 8,
          net_content: 15,
          desrcription:
            ' Tolak Angin Sidomuncul 15 Ml bermanfaat untuk mengobati gejala masuk angin, seperti mual, perut kembung, sakit perut, pusing, meriang, dan tenggorokan kering. Produk ini juga baik untuk diminum saat perjalanan jauh, kelelahan, atau kurang tidur.',
          dosing:
            'Untuk mengatasi masuk angin atau diare, minum 3–4 sachet per hari.\nUntuk meningkatkan daya tahan tubuh, minum 2 sachet tiap hari, selama 7 hari atau lebih.\nUntuk mengatasi mabuk perjalanan, minum 1 sachet sebelum melakukan perjalanan atau 1–3 sachet pada saat mabuk perjalanan.\nUntuk mengatasi kelelahan dan kurang tidur, minum 1 sachet saat mengalami kelelahan atau kurang tidur.',
          BPOM_id: 'HT122600301',
          require_prescription: false,
          price: 22550,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Antangin Good Night 4 Tablet',
          packaging_type_id: 3,
          product_type_id: 8,
          net_content: 4,
          desrcription: 'Antangin Good Night dipercaya bermanfaat untuk meringankan gangguan sulit tidur dan meredakan masuk angin.\nAntangin Good Night mengandung ekstrak daun mint, daun sembung, biji pala, jahe, passion flower, valerian, dan kulit pulai. Kombinasi bahan herbal ini dipercaya dapat meredakan gejala masuk angin, mengurangi kecemasan, merilekskan pikiran, dan membuat tidur lebih nyenyak. ',
          dosing: '2-4 tablet sebelum tidur. ',
          BPOM_id: 'TR152585031',
          require_prescription: false,
          price: 7472,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Lelap 4 Kaplet',
          packaging_type_id: 3,
          product_type_id: 8,
          net_content: 4,
          desrcription: '',
          dosing: '',
          BPOM_id: '',
          require_prescription: false,
          price: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '',
          packaging_type_id: 3,
          product_type_id: 8,
          net_content: 4,
          desrcription: '',
          dosing: '',
          BPOM_id: '',
          require_prescription: false,
          price: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
