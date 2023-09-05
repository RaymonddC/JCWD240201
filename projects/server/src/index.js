require('dotenv/config');
const express = require('express');
const cors = require('cors');
const { join } = require('path');
const path = require('path');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(','),
    ],
  }),
);

app.use(express.json());
app.use(cors());
// app.use(express.static('public'));
// app.use('/public', express.static('public'));
app.use('/product_images', express.static(path.join(__dirname, 'public/product_images')));
app.use('/profile_image', express.static(path.join(__dirname, 'public/profile_image')));
app.use('/prescription_images', express.static(path.join(__dirname, 'public/prescription_images')));
app.use('/payment_images', express.static(path.join(__dirname, 'public/payment_images')));
app.use('/logo', express.static(path.join(__dirname, 'public/logo')));
app.use('/deleted_user_profile_images', express.static(path.join(__dirname, 'public/deleted_user_profile_images')));
app.use('/deleted_product_images', express.static(path.join(__dirname, 'public/deleted_product_images')));

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

const {
  authRoute,
  userRoute,
  QnARoute,
  cartRoute,
  productRoute,
  addressRoute,
  categoryRoute,
  labelRoute,
  transactionRoute,
  txStatusRoute,
  rajaOngkirRoute,
  stockRoute,
  promotionRoute,
  prescriptionCartRoute,
  txHistoryRoute,
  stockHistoryRoute,
  promoTypeRoute,
} = require('./routers');

app.use('/auth', authRoute);
app.use('/discussions', QnARoute);
app.use('/users', userRoute);
app.use('/addresses', addressRoute);
app.use('/carts', cartRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/labels', labelRoute);
app.use('/transactions', transactionRoute);
app.use('/tx-status', txStatusRoute);
app.use('/rajaongkir', rajaOngkirRoute);
app.use('/stocks', stockRoute);
app.use('/promotions', promotionRoute);
app.use('/tx-histories', txHistoryRoute);
app.use('/prescriptioncarts', prescriptionCartRoute);
app.use('/stock-histories', stockHistoryRoute);
app.use('/promo-types', promoTypeRoute);

// app.get('/api', (req, res) => {
//   res.send(`Hello, this is my API`);
// });

// app.get('/api/greetings', (req, res, next) => {
//   res.status(200).json({
//     message: 'Hello, Student !',
//   });
// });

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes('/')) {
    res.status(404).send('Not found !');
  } else {
    next();
  }
});

// error
// app.use((err, req, res, next) => {
//   if (req.path.includes('/api/')) {
//     console.error('Error : ', err.stack);
//     res.status(500).send('Error !');
//   } else {
//     next();
//   }
// });

// app.use((err, req, res, next) => {
//   const errStatus = err.code || 500;
//   const errMessage = err.message || 'Something went wrong';
//   return res.status(errStatus).json({
//     success: false,
//     status: errStatus,
//     message: errMessage,
//     stack: err.stack,
//     data: err.data || null,
//   });
// });
//#endregion

//#region CLIENT
const clientPath = '../../client/build';
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, clientPath, 'index.html'));
});

app.use((err, req, res, next) => {
  console.log('index err',err)
  console.log('index err.essage', err.message)
  const errStatus = err.code && !isNaN(Number(err.code)) ? err.code : 500;
  const errMessage = err.message || 'Something went wrong';
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
    data: err.data,
  });
});
//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
