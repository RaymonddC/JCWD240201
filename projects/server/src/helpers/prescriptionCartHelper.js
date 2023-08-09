const db = require('../models');
const prescriptionCartDB = db.prescription_cart;
const productDB = db.product;
const openedStockDB = db.opened_stock;
const closedStockDB = db.closed_stock;

const validateForm = (data) => {
  const { cart_id, product_id, unit_conversion, qty, price } = data;

  if (!cart_id || !product_id || typeof unit_conversion !== 'boolean' || !qty)
    throw { message: 'Please fill in the form correctly', code: 400 };
};

const getStock = (data) => {
  const { product_id } = data;

  return productDB.findOne({
    include: [{ model: closedStockDB }, { model: openedStockDB }],
    where: { id: product_id },
  });
};

const validateStock = (getProduct, data) => {
  const { unit_conversion, qty } = data;

  let closedStock = getProduct.closed_stocks[0].total_stock;
  let openedStock =
    (getProduct.opened_stocks.length ? getProduct.opened_stocks[0].qty : 0) +
    getProduct.closed_stocks[0].total_stock * getProduct.net_content;

  if (qty > closedStock && unit_conversion === false)
    throw { message: `Product stock is ${closedStock}`, code: 400 };

  if (qty > openedStock && unit_conversion === true)
    throw { message: `Product stock is ${openedStock}`, code: 400 };
};

const checkProductAlreadyExist = (data) => {
  const { product_id, cart_id, unit_conversion } = data;

  console.log(product_id, cart_id, unit_conversion);

  return prescriptionCartDB.findOne({
    where: { cart_id, product_id, unit_conversion: unit_conversion },
  });
};

const calculatePrice = (getProduct, data) => {
  const { unit_conversion, qty } = data;

  if (unit_conversion)
    return Math.ceil((getProduct.price / getProduct.net_content) * qty);
  return getProduct.price * qty;
};

const calculateWeight = (getProduct, data) => {
  const { unit_conversion, qty } = data;

  if (unit_conversion)
    return Math.ceil((getProduct.weight / getProduct.net_content) * qty);
  return getProduct.weight * qty;
};

module.exports = {
  validateForm,
  getStock,
  validateStock,
  checkProductAlreadyExist,
  calculatePrice,
  calculateWeight,
};
