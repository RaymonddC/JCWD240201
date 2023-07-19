import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  list: [],
  total: 0,
  totalPrice: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.list = action.payload;
      initialState.total = 0;
      initialState.totalPrice = 0;
      action.payload.map((value) => {
        initialState.total += value.quantity;
        initialState.totalPrice +=
          value.quantity *
          (value.product.price -
            (value.product.price * value.type.discount) / 100);
      });
    },
    // onCheckData: (initialState, action)
  },
});

// export const getCartUserAsync = () => async (dispatch) => {
//   try {
//     console.log('cartAsync');
//     let userId = localStorage.getItem('userId');
//     if (!userId) {
//       dispatch(onGetData([]));
//       throw { message: 'No User' };
//     }
//     let response = await axios.get(
//       `${UrlApi}/carts?userId=${userId}&_expand=product&_expand=type`,
//     );
//     console.log('cartAsync', response.data);
//     dispatch(onGetData(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const addToCartAsync = (values) => async (dispatch) => {
  try {
    const { userId, productId } = values;
    // if(!userId) throw{}

    // let { data } = await axios.get(
    //   `${UrlApi}/carts?userId=${userId}&productsId=${productId}&typeId=${typeId}&size=${size}`,
    // );

    // console.log(data, 'double');

    // if (data.length == 0) {
    //   let response = await axios.post(`${UrlApi}/carts`, {
    //     userId,
    //     productId,
    //     typeId,
    //     size,
    //     quantity: 1,
    //   });
    //   console.log(response, 'addtocart');
    // } else {
    //   await axios.patch(`${UrlApi}/carts/${data[0].id}`, {
    //     quantity: data[0].quantity + 1,
    //   });
    // }
    // dispatch(getCartUserAsync());
    toast.success('Add to cart Success');
  } catch (error) {}
};

// export const checkoutAsync = () => async (dispatch) => {
//   try {
//     console.log('checkout');
//     let userId = localStorage.getItem('userId');
//     let { data } = await axios.get(
//       `${UrlApi}/carts?userId=${userId}&_expand=type`,
//     );

//     console.log(data, 'cart');
//     data.map(async (value) => {
//       try {
//         console.log(value.type.stock, value.quantity);
//         await axios.patch(`${UrlApi}/types/${value.typeId}`, {
//           stock: value.type.stock - value.quantity,
//         });
//         await axios.delete(`${UrlApi}/carts/${value.id}`);
//       } catch (error) {
//         toast.error(error);
//       } finally {
//         dispatch(getCartUserAsync());
//       }
//     });
//   } catch (error) {}
// };

// export const updateQuantityAsync = (calc, id, now) => async (dispatch) => {
//   try {
//     let neww = 0;
//     if (calc == '+') neww = now + 1;
//     else neww = now - 1;
//     console.log(neww);
//     if (neww <= 0) await axios.delete(`${UrlApi}/carts/${id}`);
//     else
//       await axios.patch(`${UrlApi}/carts/${id}`, {
//         quantity: neww,
//       });
//   } catch (error) {
//   } finally {
//     dispatch(getCartUserAsync());
//   }
// };

export const { onGetData } = CartSlice.actions;

export default CartSlice.reducer;
