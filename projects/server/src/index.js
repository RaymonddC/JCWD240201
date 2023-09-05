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
// app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
console.log("🚀🚀🚀 ~ file: index.js:23 ~ __dirname:", __dirname)
// app.use(express.static('public'));

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

app.use('/api/auth', authRoute);
app.use('/api/discussions', QnARoute);
app.use('/api/users', userRoute);
app.use('/api/addresses', addressRoute);
app.use('/api/carts', cartRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/labels', labelRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/tx-status', txStatusRoute);
app.use('/api/rajaongkir', rajaOngkirRoute);
app.use('/api/stocks', stockRoute);
app.use('/api/promotions', promotionRoute);
app.use('/api/tx-histories', txHistoryRoute);
app.use('/api/prescriptioncarts', prescriptionCartRoute);
app.use('/api/stock-histories', stockHistoryRoute);
app.use('/api/promo-types', promoTypeRoute);

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
