const db = require('../models');
const TxStatus = db.transaction_status;

const getAllTxStatus = async (req, res, next) => {
  try {
    const txStatus = await TxStatus.findAll();

    return res.status(200).send({
      success: true,
      message: 'get all Transaction Status success',
      data: txStatus,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTxStatus };
