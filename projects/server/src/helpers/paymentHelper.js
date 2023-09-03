const { error } = require('console');
const midtransClient = require('midtrans-client');
const axios = require('axios');

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const date = new Date();
const URL = `${process.env.REACT_APP_API_BASE_URL}`;

const getMidtransSnap = async (values) => {
  try {
    const count =
      (values.transaction.payment_id &&
        Number(values.transaction.payment_id.split('-')[2]) + 1) ||
      1;
    const orderId = '101-' + values.transaction.id + '-' + count;
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount:
          values.transaction.total_price +
          values.transaction.shipment_fee -
          values.transaction.total_discount,
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
        {
          price: values.transaction.shipment_fee,
          name: 'Shipping Fee',
          quantity: 1,
        },
        {
          name: 'Discount',
          price: -values.transaction.total_discount,
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
        finish: `${URL}/user/transaction`,
      },
      page_expiry: {
        duration: 3,
        unit: 'hours',
      },
    };

    const { token, redirect_url } = await snap.createTransaction(parameter);

    return { paymentToken: token, redirect_url, orderId };
  } catch (error) {
    throw error;
  }
};

const getPaymentStatusMidtrans = async (values) => {
  try {
    return await axios.get(
      `${'https://api.sandbox.midtrans.com/v2/'}${values.order_id}${'/status'}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.MIDTRANS_SERVER_KEY + ':',
        },
      },
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { getMidtransSnap, getPaymentStatusMidtrans };
