export const validatePromotion = (values) => {
  const errors = {};
  if (
    !values.product_id &&
    (values.promotion_type_id === '1' || values.promotion_type_id === '3')
  ) {
    errors.product_id = 'Product is required';
  }
  if (
    !values.discount &&
    (values.promotion_type_id === '1' || values.promotion_type_id === '2')
  ) {
    errors.discount = 'Discount is required';
  }
  if (!values.buy && values.promotion_type_id === '3') {
    errors.buy = 'Buy is required';
  }
  if (!values.get && values.promotion_type_id === '3') {
    errors.get = 'Get is required';
  }
  if (!values.limit) {
    errors.limit = 'Promotion limit is required';
  }
  if (!values.minimum_transaction && values.promotion_type_id === '2') {
    errors.minimum_transaction = 'Min. transaction limit is required';
  }
  if (
    !values.maximum_discount_amount &&
    (values.promotion_type_id === '1' || values.promotion_type_id === '2')
  ) {
    errors.maximum_discount_amount = 'Max. discount amount is required';
  }
  if (!values.date_start) {
    errors.date_start = 'Promotion start is required';
  }
  if (!values.date_end) {
    errors.date_end = 'Promotion end is required';
  }
  return errors;
};
