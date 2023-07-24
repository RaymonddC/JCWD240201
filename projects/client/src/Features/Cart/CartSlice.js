import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getUserCarts,
  postCart,
  updateCart,
} from '../../API/cartAPI';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  carts: [],
  totalCart: 0,
  activeCart: 0,
  totalPrice: 0,
  discount: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.carts = action.payload.data;
      initialState.totalCart = action.payload.totalCart;
      initialState.activeCart = action.payload.activeCart;
      initialState.totalPrice = action.payload.totalPrice;
      initialState.discount = action.payload.discount;
    },
  },
});

export const getCartUserAsync = () => async (dispatch) => {
  try {
    console.log('cartAsync');
    let token = localStorage.getItem('token');
    if (!token) {
      dispatch(onGetData([]));
      throw { message: 'No User' };
    }

    let { data } = await getUserCarts(token);
    let totalPrice = 0,
      totalCart = 0,
      activeCart = 0,
      discount = 0;
    data.data.map((value) => {
      // console.log(value.product);
      totalCart += value.qty;
      if (value.is_check) {
        activeCart += value.qty;
        totalPrice += value.qty * value.product.price;
        value.product.promotions?.map((promo) => {
          if (promo?.discount)
            discount +=
              value.qty * value.product.price * (promo.discount / 100);
        });
      }
    });

    dispatch(
      onGetData({
        data: data.data,
        totalCart,
        totalPrice,
        activeCart,
        discount,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const addToCartAsync = (values) => async (dispatch) => {
  try {
    const { productId, qty } = values;
    const token = localStorage.getItem('token');
    if (!token) throw { message: 'Please Login First' };
    if (!productId) throw { message: "Product doesn't exist" };
    // if(!userId) throw{}

    postCart(token, { productId, qty });

    await dispatch(getCartUserAsync());
    toast.success('Add to cart Success');
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateCartAsync = (values) => async (dispatch) => {
  try {
    const { cartId, qty, isCheck, stock } = values;

    const token = localStorage.getItem('token');
    if (stock < qty) throw { message: 'stock kurang' };
    if (qty <= 0) await deleteCart(token, cartId);
    else await updateCart(token, cartId, { qty, isCheck });
  } catch (error) {
    toast.error(error.message);
  } finally {
    dispatch(getCartUserAsync());
  }
};

export const deleteCartAsync = (values) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let { data } = await deleteCart(token, values.id);
    if (data.data) {
      await dispatch(getCartUserAsync());
      return toast.success('Product removed from cart');
    }
    return toast.error('Failed to remove product');
  } catch (error) {
    toast.error(error.message);
  }
};

export const checkoutAsync = () => async (dispatch) => {
  try {
    console.log('checkout');
    let token = localStorage.getItem('token');

    let { data } = await axios.get(
      `${UrlApi}/carts?userId=${userId}&_expand=type`,
    );

    console.log(data, 'cart');
    data.map(async (value) => {
      try {
        console.log(value.type.stock, value.quantity);
        await axios.patch(`${UrlApi}/types/${value.typeId}`, {
          stock: value.type.stock - value.quantity,
        });
        await axios.delete(`${UrlApi}/carts/${value.id}`);
      } catch (error) {
        toast.error(error);
      } finally {
        dispatch(getCartUserAsync());
      }
    });
  } catch (error) {}
};

export const { onGetData } = CartSlice.actions;

export default CartSlice.reducer;
