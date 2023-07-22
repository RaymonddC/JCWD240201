const { address } = require('./../models');
const { get } = require('./transporter');

const validateForm = (data) => {
  if (
    !data.city_id ||
    !data.address ||
    !data.phone_number ||
    !data.reciever ||
    !data.province_id
  ) {
    throw { message: 'Please fill your form correctly', code: 400 };
  }
};

const isFirstAddress = async (user_id) => {
  const getAddress = await address.findAll({
    where: user_id,
  });

  if (getAddress.length) {
    return false;
  }
  return true;
};

const validateUserAndIsDeleted = async (user_id, id) => {
  const getAddress = await address.findOne({
    where: {
      id,
    },
  });

  if (!getAddress) {
    throw { message: 'Address Not Found', code: 404 };
  }

  if (getAddress && getAddress.user_id !== user_id)
    throw { message: 'You Not Allowed to Update this Address', code: 403 };

  return getAddress;
};

const setNewIsMain = async (user_id) => {
  const getAddress = await address.findOne({
    where: {
      user_id,
      is_main: false,
    },
  });

  if (getAddress) {
    await address.update({ is_main: true }, { where: { id: getAddress.id } });
  }
};

const getOldIsMain = async (user_id) => {
  const getAddress = await address.findOne({
    where: {
      user_id,
      is_main: true,
    },
  });
  return getAddress;
};

const changeOldIsMain = async (id) => {
  const updateOldIsMain = await address.update(
    {
      is_main: false,
    },
    {
      where: {
        id,
      },
    },
  );
  return updateOldIsMain;
};

module.exports = {
  validateForm,
  isFirstAddress,
  validateUserAndIsDeleted,
  changeOldIsMain,
  getOldIsMain,
  setNewIsMain,
};
