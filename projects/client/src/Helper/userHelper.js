export const convertDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('id-ID', {
    dateStyle: 'long',
  });
};

export const validationUserEditModal = (values) => {
  const errors = {};
  if (!values.full_name) {
    errors.full_name = 'Full name is required';
  }
  if (!values.phone_number) {
    errors.phone_number = 'Phone number is required';
  }
  if (isNaN(Number(values.phone_number))) {
    errors.phone_number = 'Phone number should be a number';
  }
  if (!values.gender) {
    errors.gender = 'Gender is required';
  }
  if (!values.birthdate) {
    errors.birthdate = 'Birthdate is required';
  }
  return errors;
};
