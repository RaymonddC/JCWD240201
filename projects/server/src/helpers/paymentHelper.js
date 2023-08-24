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
        order_id: '100-' + values.transaction.id,
        gross_amount: values.totalPay,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: values.user.full_name,
        // last_name: 'pratama',
        // email: values.user.email,
        first_name: 'TESTNAME',
        last_name: 'MIDTRANSERNAME',
        // email: 'test@midtrans.com',
        phone: '+628123456',
        shipping_address: {
          // first_name: 'TEST',
          // last_name: 'MIDTRANSER',
          // email: 'test@midtrans.com',
          // phone: '0 8128-75 7-9338',
          address: 'SudirmanShipp',
          city: 'Jakarta',
          postal_code: '12192',
          // country_code: 'MDO',
        },
      },
      item_details: [
        ...values.txDetails.map((value) => {
          return {
            name: value.product_name,
            quantity: value.qty,
            price: value.price,
          };
        }),
        { price: values.shippingFee, name: 'Shipping Fee', quantity: 1 },
        {
          name: 'Discount',
          price: -values.totalDiscount,
          quantity: 1,
          // id: 'D01',
        },
      ],
      // {
      //   id: 'ITEM1',
      //   price: values.totalPay,
      //   quantity: 1,
      //   name: 'Midtrans Bear',
      //   brand: 'Midtrans',
      //   category: 'Toys',
      //   merchant_name: 'Midtrans',
      //   url: 'http://toko/toko1?item=abc',
      // },
      callbacks: {
        finish: 'http://localhost:3000/user/transaction',
      },
      page_expiry: {
        duration: 3,
        unit: 'hours',
      },
    };
    console.log(parameter);

    const { token, redirect_url } = await snap.createTransaction(parameter);

    console.log('transactionToken:', token, redirect_url);
    return { paymentToken: token, redirect_url };
  } catch (error) {
    throw error;
  }
};

module.exports = { getMidtransSnap };
