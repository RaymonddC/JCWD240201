const {
  validateForm,
  getStock,
  validateStock,
  checkProductAlreadyExist,
  calculatePrice,
  calculateWeight,
} = require('../helpers/prescriptionCartHelper');
const db = require('../models');
const prescriptionCartDB = db.prescription_cart;
const productDB = db.product;
const packagingDB = db.packaging_type;
const productTypeDB = db.product_type;
const openedStockDB = db.opened_stock;
const closedStockDB = db.closed_stock;

const getAllPrescriptionCartProductList = async (req, res, next) => {
  try {
    const { cart_id } = req.query;

    if (!cart_id) throw { message: 'Cart_id is required', code: 400 };

    const data = await prescriptionCartDB.findAll({
      where: { cart_id: cart_id },
      include: [
        {
          model: productDB,
          include: [
            { model: packagingDB },
            { model: productTypeDB },
            { model: closedStockDB },
            { model: openedStockDB },
          ],
        },
      ],
    });

    res.send({
      success: true,
      message: 'Get all prescription products list success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const getPrescriptionCartProduct = async (req, res, next) => {
  try {
    const { cart_id, product_id, unit_conversion } = req.params;
    const data = await prescriptionCartDB.findOne({
      where: { id },
    });

    res.send({
      success: true,
      message: 'Get prescription cart product success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

const createPrescriptionCartProduct = async (req, res, next) => {
  try {
    const data = req.body;
    validateForm(data);
    const getProduct = await getStock(data);
    const price = calculatePrice(getProduct, data);
    const weight = calculateWeight(getProduct, data);

    const isProductAlreadyExist = await checkProductAlreadyExist(data);
    if (isProductAlreadyExist) {
      validateStock(getProduct, {
        unit_conversion: data.unit_conversion,
        qty: isProductAlreadyExist.qty + data.qty,
      });

      await prescriptionCartDB.update(
        {
          qty: isProductAlreadyExist.qty + data.qty,
          price: isProductAlreadyExist.price + price,
          weight: isProductAlreadyExist.weight + weight,
        },
        { where: { id: isProductAlreadyExist.id } },
      );
    } else {
      validateStock(getProduct, data);
      await prescriptionCartDB.create({ ...data, price, weight });
    }
    res.send({
      success: true,
      message: 'Create prescription cart product success',
    });
  } catch (error) {
    next(error);
  }
};

const updatePrescriptionCartProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    validateForm(data);
    const getProduct = await getStock(data);
    validateStock(getProduct, data);
    const price = calculatePrice(getProduct, data);
    const weight = calculateWeight(getProduct, data);

    await prescriptionCartDB.update(
      { ...data, price, weight },
      { where: { id } },
    );

    res.send({
      success: true,
      message: 'Update prescription cart product success',
    });
  } catch (error) {
    next(error);
  }
};

const deletePrescriptionCartProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prescriptionCartDB.destroy({ where: { id } });

    res.send({
      success: true,
      message: 'Delete prescription cart product success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPrescriptionCartProductList,
  getPrescriptionCartProduct,
  createPrescriptionCartProduct,
  updatePrescriptionCartProduct,
  deletePrescriptionCartProduct,
};
