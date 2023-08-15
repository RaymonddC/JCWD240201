import { configureStore } from '@reduxjs/toolkit';

import UserReducer from '.././Features/User/UserSlice';
import QnAReducer from '.././Features/QnA/QnASlice';
import CartReducer from '.././Features/Cart/CartSlice';
import ProductReducer from '.././Features/Product/ProductSlice';
import CategoryReducer from '.././Features/Category/CategorySlice';
import AddressReducer from '../Features/Address/AddressSlice';
import TransactionReducer from '../Features/Transaction/TransactionSlice';
import TransactionStatusReducer from '../Features/TransactionStatus/TransactionStatusSlice';
import CheckoutReducer from '../Features/Checkout/CheckoutSlice';
import PrescriptionCartReducer from '../Features/PrescriptionCart/PrescriptionCartSlice';
import SalesReportReducer from '../Features/SalesReport/SalesReportSlice';

export const Store = configureStore({
  reducer: {
    user: UserReducer,
    QnA: QnAReducer,
    cart: CartReducer,
    products: ProductReducer,
    categories: CategoryReducer,
    address: AddressReducer,
    transaction: TransactionReducer,
    txStatus: TransactionStatusReducer,
    checkout: CheckoutReducer,
    PrescriptionCart: PrescriptionCartReducer,
    salesReport: SalesReportReducer,
  },
});
