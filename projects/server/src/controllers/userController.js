const deleteFiles = require('../helpers/deleteFiles');
const { validate } = require('../helpers/userHelper');
const db = require('./../models');
const userDB = db.user;
const roleDB = db.role;
const fs = require('fs');
const bcrypt = require('bcrypt');
const { validateEmail } = require('../helpers/authHelper');
const jwt = require('jsonwebtoken');
const Handlebars = require('handlebars');
const transporter = require('../helpers/transporter');

const updateUserData = async (req, res, next) => {
  try {
    const auth = req.user;
    const image = req.file;

    console.log(image);
    const { full_name, phone_number, gender, birthdate } = req.body;
    validate({ full_name, phone_number, gender, birthdate });
    if (image) {
      const previousImage = await userDB.findOne({
        attributes: ['profile_image'],
        where: {
          id: auth.id,
        },
      });

      await userDB.update(
        {
          full_name,
          phone_number,
          gender,
          birthdate,
          profile_image: `${image.fieldname}/${image.filename}`,
        },
        { where: { id: auth.id } },
      );

      if (previousImage.dataValues.profile_image) {
        let isDirectoryExist = fs.existsSync(
          `src/public/deleted_user_profile_images`,
        );

        if (!isDirectoryExist) {
          await fs.promises.mkdir(`src/public/deleted_user_profile_images`, {
            recursive: true,
          });
        }
        const oldPath = `src/public/${previousImage.dataValues.profile_image}`;
        const fileName = previousImage.dataValues.profile_image.split('/');
        const newPath = `src/public/deleted_user_profile_images/${
          fileName[fileName.length - 1]
        }`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
        });
      }
    } else {
      await userDB.update(
        {
          full_name,
          phone_number,
          gender,
          birthdate,
        },
        {
          where: {
            id: auth.id,
          },
        },
      );
    }

    res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    if (req.file) {
      deleteFiles([req.file]);
    }
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const previousEmail = req.user.email;
    if (!email) throw { message: 'Please fill the form correctly', code: 400 };
    const isEmailExist = await userDB.findOne({
      where: { email },
    });
    if (isEmailExist) throw { message: 'Email already in use', code: 400 };

    await userDB.update(
      { email: email, verified: false, change_email_token: null },
      { where: { email: previousEmail } },
    );

    res.status(200).send({
      success: true,
      message:
        'Change email successfully, please check your new email for verification',
    });
  } catch (error) {
    next(error);
  }
};

const sendChangeEmailForm = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailValid = await validateEmail(email);
    if (isEmailValid) throw isEmailValid;
    const isEmailExist = await userDB.findOne({
      where: { email: email },
    });
    if (!isEmailExist) throw { message: 'Email not found', code: 404 };
    let payload = { email: email };
    const token = jwt.sign(payload, 'change-email', {
      expiresIn: '1h',
    });
    await userDB.update(
      { change_email_token: token },
      { where: { email: email } },
    );
    const data = fs.readFileSync('./src/helpers/changeEmailForm.html', 'utf-8');
    const tempCompile = await Handlebars.compile(data);
    const tempResult = tempCompile({ token: token });

    await transporter.sendMail({
      from: 'pharmacy.jcwd2402@gmail.com',
      to: email,
      subject: 'Change Email',
      html: tempResult,
      attachments: [
        {
          filename: 'Medicore.png',
          path: `../server/public/logo/Medicore.png`,
          cid: 'logo1',
        },
      ],
    });

    return res.send({
      success: true,
      status: 200,
      message: 'Please check your email to change your email',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserData,
  updateEmail,
  sendChangeEmailForm,
};
