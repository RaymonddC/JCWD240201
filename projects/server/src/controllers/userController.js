const deleteFiles = require('../helpers/deleteFiles');
const { validate } = require('../helpers/userHelper');
const db = require('./../models');
const userDB = db.user;
const roleDB = db.role;
const fs = require('fs');
const bcrypt = require('bcrypt');

const updateUserData = async (req, res, next) => {
  try {
    const auth = req.user;
    const image = req.file;
    const { full_name, phone_number, gender, birthdate } = req.body;
    validate({ full_name, phone_number, gender, birthdate });

    if (image) {
      const previousImage = await user.findOne({
        attributes: ['profile_image'],
        where: {
          id: auth.id,
        },
      });

      await user.update(
        {
          full_name,
          phone_number,
          gender,
          birthdate,
          profile_image: image.path,
        },
        { where: { id: auth.id } },
      );

      if (previousImage.dataValues.profile_image) {
        const oldPath = previousImage.dataValues.profile_image;
        const fileName = previousImage.dataValues.profile_image.split('/');
        const newPath = `public/deleted_user_profile_images/${
          fileName[fileName.length - 1]
        }`;

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
        });
      }
    } else {
      await user.update(
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
      { email: email, verified: false },
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

module.exports = {
  updateUserData,
  updateEmail,
};
