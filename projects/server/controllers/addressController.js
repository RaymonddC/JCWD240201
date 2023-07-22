const {
  validateForm,
  validateUserAndIsDeleted,
  isFirstAddress,
  changeOldIsMain,
  getOldIsMain,
  setNewIsMain,
} = require('../helpers/addressHelper');
const db = require('../models');
const addressDB = db.address;

const getAllAddress = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const data = await addressDB.findAll({
      where: {
        user_id,
      },
    });
    res.send({
      success: true,
      message: 'Get All Address Successfully',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { city_id, address, phone_number, reciever, province_id, notes } =
      req.body;

    validateForm({ city_id, address, phone_number, reciever, province_id });

    const is_main = await isFirstAddress(user_id);

    const result = await addressDB.create({
      user_id,
      city_id,
      address,
      phone_number,
      reciever,
      province_id,
      notes,
      is_main,
    });

    res.status(201).send({
      success: true,
      message: 'Address Created successfully',
      data: result,
    });
    console.log(is_main);
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { city_id, address, phone_number, reciever, province_id, notes } =
      req.body;

    validateForm({ city_id, address, phone_number, reciever, province_id });
    await validateUserAndIsDeleted(user_id, id);

    const result = await addressDB.update(
      {
        city_id,
        address,
        phone_number,
        reciever,
        province_id,
        notes,
      },
      {
        where: {
          id,
        },
      },
    );

    res.status(200).send({
      success: true,
      message: 'Address Updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIsMain = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { is_main } = req.body;

    if (!is_main)
      throw { message: 'Please fill your form correctly', code: 400 };

    await validateUserAndIsDeleted(user_id, id);

    const oldIsMain = await getOldIsMain(user_id);

    await changeOldIsMain(oldIsMain.id);

    const result = await addressDB.update(
      {
        is_main: true,
      },
      {
        where: {
          id,
        },
      },
    );

    res.status(200).send({
      success: true,
      message: 'Address successfully selected',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const getAddress = await validateUserAndIsDeleted(user_id, id);

    if (getAddress.is_main) setNewIsMain(user_id);

    const result = await addressDB.destroy({
      where: {
        id,
        user_id,
      },
    });

    res.status(200).send({
      success: true,
      message: 'Address Delete successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAddress,
  createAddress,
  updateAddress,
  updateIsMain,
  deleteAddress,
};
