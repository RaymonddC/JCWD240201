const validate = (data) => {
  if (
    !data.full_name ||
    !data.phone_number ||
    !data.gender ||
    !data.birthdate
  ) {
    throw { message: 'Please fill your form correctly', code: 400 };
  }

  const date = new Date(data.birthdate);

  // Check if the date is valid by comparing it to a valid date string
  // and checking if the date object is not NaN
  if (date.toString() === 'Invalid Date') {
    throw { message: 'Date Format is Wrong', code: 400 };
  }
};

module.exports = {
  validate,
};
