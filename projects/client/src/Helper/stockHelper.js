export const validateUpdateStock = (values) => {
  const errors = {};
  if (!values.stock_history_type_id) {
    errors.stock_history_type_id = 'Update Type is required';
  }
  if (!values.qty) {
    errors.qty = 'Quantity is required';
  }
  if (!values.action) {
    errors.action = 'Action is required';
  }
  return errors;
};
