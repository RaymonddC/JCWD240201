const {
  validateForm,
  validateUserAndIsDeleted,
  isFirstAddress,
  changeOldIsMain,
  getOldIsMain,
  manipulateArray,
  getProvinceRajaOngkir,
  getCityRajaOngkir,
  getOldIsSelected,
  changeOldIsSelected,
  setNewIsSelected,
} = require('../helpers/addressHelper');
const db = require('../models');
const addressDB = db.address;

const getAllAddress = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const data = await addressDB.findAll({ where: { user_id } });

    const result = manipulateArray(data);

    res.status(200).send({
      success: true,
      message: 'Get All Address Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const data = req.body;

    validateForm({ ...data });

    const is_first = await isFirstAddress(user_id);

    const result = await addressDB.create({
      ...data,
      user_id,
      is_main: is_first ? true : false,
      is_selected: is_first ? true : false,
    });

    res.status(201).send({
      success: true,
      message: 'Address Created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const data = req.body;

    validateForm({ ...data });
    await validateUserAndIsDeleted(user_id, id);

    const result = await addressDB.update({ ...data }, { where: { id } });

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

    const result = await addressDB.update({ is_main: true }, { where: { id } });

    res.status(200).send({
      success: true,
      message: 'Main Address changed successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIsSelected = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { is_selected } = req.body;

    if (!is_selected)
      throw { message: 'Please fill your form correctly', code: 400 };

    await validateUserAndIsDeleted(user_id, id);
    const oldIsSelected = await getOldIsSelected(user_id);
    await changeOldIsSelected(oldIsSelected.id);

    const result = await addressDB.update(
      { is_selected: true },
      { where: { id } },
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

    if (getAddress.is_main)
      throw { message: 'Cant delete main address', code: 403 };

    if (getAddress.is_selected) setNewIsSelected(user_id);

    const result = await addressDB.destroy({ where: { id, user_id } });

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
  updateIsSelected,
  deleteAddress,
};
