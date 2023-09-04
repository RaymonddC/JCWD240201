// Import Multer
const multer = require('multer');

// Import File System
const fs = require('fs');

const path = require("path");

// 1. Setup Disk Storage & Filename
let defaultPath = path.join(__dirname, '../public');
var storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Check Directory (Exist or Not)
    let isDirectoryExist = fs.existsSync(`${defaultPath}/${file.fieldname}`);

    if (!isDirectoryExist) {
      await fs.promises.mkdir(`${defaultPath}/${file.fieldname}`, {
        recursive: true,
      });
    }

    // To Create 'Public/pdf' or 'Public/images'
    if (file.fieldname === 'pdf') {
      cb(null, `${defaultPath}/${file.fieldname}`);
    }
    if (file.fieldname === 'images') {
      cb(null, `${defaultPath}/${file.fieldname}`);
    }
    if (file.fieldname === 'profile_image') {
      cb(null, `${defaultPath}/${file.fieldname}`);
    }
    if (file.fieldname === 'prescription_images') {
      cb(null, `${defaultPath}/${file.fieldname}`);
    }
    if (file.fieldname === 'product_images') {
      cb(null, `${defaultPath}/${file.fieldname}`);
    }
    if (file.fieldname === 'payment_images') {
      cb(null, `${defaultPath}/${file.fieldname}`);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      'PIMG' +
        '-' +
        Date.now() +
        Math.round(Math.random() * 1000000000) +
        '.' +
        file.mimetype.split('/')[1],
    );
  },
});

// 2. Setup File Filter
var fileFilter = (req, file, cb) => {
  // if (
  //   file.mimetype.split('/')[1] === 'jpg' ||
  //   file.mimetype.split('/')[1] === 'jpeg' ||
  //   file.mimetype.split('/')[1] === 'png'
  // ) {
  // Accept
  //   cb(null, true);
  // } else if (file.mimetype.split('/')[0] !== 'image') {
  // Reject
  //   cb(new Error('File Must Be Image!'));
  // }

  // format
  if (
    file.mimetype.split('/')[1] === 'jpg' ||
    file.mimetype.split('/')[1] === 'jpeg' ||
    file.mimetype.split('/')[1] === 'png'
  ) {
    // Accept
    cb(null, true);
  } else {
    // Reject
    cb(new Error('File Must Be JPG,JPEG, or PNG!'));
  }
};

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter });
