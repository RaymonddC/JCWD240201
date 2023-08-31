import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getAllPrescriptionsCartsAPI,
  getPrescriptionCartAPI,
  getUserCarts,
  postCart,
  updateCart,
  updateConfirmationPrescriptionCartAPI,
} from '../../API/cartAPI';
import { processData } from '../../Helper/cartHelper';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  carts: [],
  totalCart: 0,
  activeCart: 0,
  totalPrice: 0,
  discount: 0,
  weight: 0,
  prescriptionCarts: [],
  detailprescriptionCart: {},
  promotionActive: null,
  amountPromotion: 0,
  minimumPricePromo: 0,
  maximumPromo: null,
  promoDisc: 0,
  loadCarts: false,
  updatePrescriptionLoad: false,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      if (action.payload.totalPrice < initialState.minimumPricePromo) {
        initialState.promotionActive = null;
        initialState.amountPromotion = 0;
        initialState.minimumPricePromo = 0;
        toast.error('Promotion Updated! due to minimum transaction');
      }
      initialState.carts = action.payload.carts;
      initialState.totalCart = action.payload.totalCart;
      initialState.activeCart = action.payload.activeCart;
      initialState.totalPrice = action.payload.totalPrice;
      initialState.discount = action.payload.discount;
      initialState.weight = action.payload.weight;
      initialState.amountPromotion = Math.min(
        Math.round((action.payload.totalPrice * initialState.promoDisc) / 100),
        initialState.maximumPromo,
      );
    },
    setPrescriptionCarts: (initialState, action) => {
      initialState.prescriptionCarts = action.payload;
    },
    setDetailprescriptionCart: (initialState, action) => {
      initialState.detailprescriptionCart = action.payload;
    },
    onChangeActivePromo: (initialState, action) => {
      initialState.promotionActive = action.payload.id;
      initialState.amountPromotion = action.payload.amount;
      initialState.minimumPricePromo = action.payload.minPrice;
      initialState.maximumPromo = action.payload.maxPromo;
      initialState.promoDisc = action.payload.promoDisc;
    },
    setLoadCarts: (initialState, action) => {
      initialState.loadCarts = action.payload;
    },
    setUpdatePrescriptionLoad: (initialState, action) => {
      initialState.updatePrescriptionLoad = action.payload;
    },
  },
});

export const updateQtyAsync = (values) => async (dispatch) => {
  try {
    const { newQty, calc, idx, carts, checked = '' } = values;
    let newCarts = [...carts];
    let cart = { ...carts[idx] };
    newCarts[idx] = cart;
    let prodStock = cart.product?.closed_stocks[0]?.total_stock;
    let promoStock = cart.product?.promotions[0]?.limit || prodStock * 100;
    let stock = prodStock < promoStock ? prodStock : promoStock;

    if (calc) {
      if (calc === '+')
        if (cart.qty + 1 > stock) return toast.error('Out of stock');
        else cart.qty = cart.qty + 1;
      else {
        if (cart.qty <= 0) return toast.error('Cart deleted');
        else cart.qty--;
      }
    } else if (checked !== '') {
      cart.is_check = checked;
    } else {
      if (newQty > stock) return toast.error('Out of stock');
      else cart.qty = newQty;
    }
    newCarts[idx].qty = cart.qty;
    newCarts[idx].is_check = cart.is_check;
    dispatch(onGetData(await processData(newCarts)));
  } catch (error) {
    console.log(error);
  }
};

export const getCartUserAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    dispatch(setLoadCarts(true));
    if (!token) {
      dispatch(setLoadCarts(false));
      throw { message: 'No user' };
    }

    let { data } = await getUserCarts(token);

    if (data.success) {
      dispatch(onGetData(await processData(data.data)));
      dispatch(setLoadCarts(false));
    }
  } catch (error) {}
};

export const addToCartAsync = (values) => async (dispatch) => {
  try {
    // console.log('>>>>>>>', values);
    const { productId, qty, prescriptionImage } = values;
    const token = localStorage.getItem('token');
    if (!token) throw { message: 'Please login first' };
    if (!productId) throw { message: "Product doesn't exist" };
    if ((productId === 1) & !prescriptionImage) {
      throw { message: 'Please upload image' };
    }
    console.log(qty);
    const response = await postCart(token, {
      productId,
      qty,
      prescription_images: prescriptionImage,
    });
    // console.log(response);

    await dispatch(getCartUserAsync());
    toast.success('Add to cart Success');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const updateCartAsync = (values) => async (dispatch) => {
  try {
    const { cartId, qty, isCheck, stock } = values;

    const token = localStorage.getItem('token');
    if (stock < qty) throw { message: 'Not enough stock' };
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
      // toast.success('Product removed from cart');
      return { data: { message: 'Product removed from cart' }, success: true };
    }
  } catch (error) {
    return toast.error('Failed to remove product');
    // toast.error(error.message);
  }
};

export const getAllPrescriptionsCartsSlice = (params) => async (dispatch) => {
  try {
    // const { search } = params;
    const token = localStorage.getItem('token');
    const response = await getAllPrescriptionsCartsAPI(token, params);

    if (response.data.success) {
      dispatch(setPrescriptionCarts(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPrescriptionCartSlice = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await getPrescriptionCartAPI(token, id);

    if (response.data.success) {
      dispatch(setDetailprescriptionCart(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateConfirmationPrescriptionCartSlice =
  (id, confirmation, navigate, setOpen, notes) => async (dispatch) => {
    try {
      dispatch(setUpdatePrescriptionLoad(true));
      const token = localStorage.getItem('token');
      const response = await updateConfirmationPrescriptionCartAPI(
        token,
        id,
        confirmation,
        notes,
      );

      if (response.data.success) {
        dispatch(getAllPrescriptionsCartsSlice());
        navigate('/prescription');
        setOpen(false);
        dispatch(setUpdatePrescriptionLoad(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const newActivePromo = (values, close) => async (dispatch) => {
  try {
    dispatch(onChangeActivePromo(values));
    close();
  } catch (error) {
    console.log(error);
    toast.error('error');
  }
};

export const {
  onGetData,
  getCurrentCart,
  setPrescriptionCarts,
  setDetailprescriptionCart,
  onChangeActivePromo,
  setLoadCarts,
  setUpdatePrescriptionLoad,
} = CartSlice.actions;

export default CartSlice.reducer;
