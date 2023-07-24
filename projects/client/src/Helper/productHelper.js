export const validateAddProduct = (values) => {
  const errors = {};
  if (!values.product.name) {
    errors.name = 'Name is required';
  }
  if (!values.product.packaging_type) {
    errors.packaging_type = 'Packaging type is required';
  }
  if (!values.product.unit) {
    errors.unit = 'Unit is required';
  }
  if (!values.product.net_content) {
    errors.net_content = 'Net content is required';
  }
  if (!values.product.description) {
    errors.description = 'Description is required';
  }
  if (!values.product.dosing) {
    errors.dosing = 'Dosing is required';
  }
  if (!values.product.BPOM_id) {
    errors.BPOM_id = 'BPOM id is required';
  }
  if (!values.product.require_prescription) {
    errors.require_prescription = 'Require prescription is required';
  }
  if (!values.product.price) {
    errors.price = 'Price is required';
  }
  if (!values.category.id) {
    errors.id = 'Category is required';
  }
  if (!values.image.product) {
    errors.product = 'Image is required';
  }
  return errors;
};
