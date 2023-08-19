const { error } = require('console');
const midtransClient = require('midtrans-client');

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const date = new Date();

const getMidtransSnap = async (values) => {
  try {
    console.log(date.toJSON());
    let parameter = {
      transaction_details: {
        order_id: 'INV/' + date.toJSON(),
        gross_amount: values.totalPay,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: values.user.full_name,
        // last_name: 'pratama',
        email: values.user.email,
        // phone: ,
      },
    };

    const { token, redirect_url } = await snap.createTransaction(parameter);

    console.log('transactionToken:', token, redirect_url);
    return { token, redirect_url };
  } catch (error) {
    throw error;
  }
};

module.exports = { getMidtransSnap };
