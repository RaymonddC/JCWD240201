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

export const validateFilterStockHistory = (values) => {
  const errors = {};
  if (values.product_id === 0) {
    errors.product_id = 'Product is required';
  }
  if (!values.sortOrder) {
    errors.sortOrder = 'Sort order is required';
  }
  if (!values.date_start) {
    errors.date_start = 'Date start is required';
  }
  if (!values.date_end) {
    errors.date_end = 'Date end is required';
  }
  return errors;
};
