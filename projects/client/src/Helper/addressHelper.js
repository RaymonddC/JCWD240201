export const validationAddressModal = (values) => {
  const errors = {};
  if (!values.reciever) {
    errors.reciever = 'Reciever name is required';
  }
  if (!values.phone_number) {
    errors.phone_number = 'Phone number is required';
  }
  if (isNaN(Number(values.phone_number))) {
    errors.phone_number = 'Phone number should be a number';
  }
  if (
    !values.province_id ||
    values.province_id === '0' ||
    !values.province_name
  ) {
    errors.province_id = 'Province is required';
  }
  if (!values.city_id || values.city_id === '0' || !values.city_name) {
    errors.city_id = 'City is required';
  }
  if (!values.address) {
    errors.address = 'Address is required';
  }
  return errors;
};
