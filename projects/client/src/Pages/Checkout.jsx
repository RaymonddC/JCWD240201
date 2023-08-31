import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutAddress from '../Components/Checkout/CheckoutAddress';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCartUserAsync, newActivePromo } from '../Features/Cart/CartSlice';
import ShippingMethod from '../Components/Checkout/ShippingMethod';
import { toast } from 'react-hot-toast';
import { checkoutTxSlice } from '../Features/Checkout/CheckoutSlice';
import CartSummary from '../Components/Cart/CartSummary';
import PaymentMethod from '../Components/Checkout/PaymentMethod';
import {
  // handleMidtransPaymentSlice,
  // handleOnlinePaymentSlice,
  openMidtransSnapSlice,
} from '../Features/Transaction/TransactionSlice';
import Logo from '../utils/images/medicore_icon.png';
import {
  AddressCheckoutSkl,
  ProductCheckoutSkl,
  ShippingCheckoutSkl,
  PaymentCheckoutSkl,
} from '../Components/Skeleton/CheckoutSkl';
import CartSummarySkl from '../Components/Skeleton/CartSummarySkl';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const { shippingFee } = useSelector((state) => state.checkout);
  const { loadAddress } = useSelector((state) => state.address);
  const {
    carts,
    totalCart,
    totalPrice,
    activeCart,
    discount,
    promotionActive,
    amountPromotion,
    loadCarts,
  } = useSelector((state) => state?.cart);

  const [shipping, setShipping] = useState({
    courier: null,
    duration: null,
  });
  const [paymentMethod, setPaymentMethod] = useState();

  const [tokenMidtrans, setTokenMidtrans] = useState(null);

  useEffect(() => {
    dispatch(getCartUserAsync());

    return () => {
      setTokenMidtrans(null);
    };
  }, []);

  useEffect(() => {
    console.log(tokenMidtrans, '================>>>>>>>>>>');
    if (tokenMidtrans)
      dispatch(openMidtransSnapSlice({ tokenMidtrans }, navigate));
  }, [tokenMidtrans]);

  //PaymentGateway
  useEffect(() => {
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY || '';
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  if (!token) return <Navigate to="/" />;
  if (activeCart === 0 && loadAddress === false && loadCarts === false)
    return <Navigate to="/cart" />;
  // if (!carts.length) return <Navigate to="/cart" />;

  return (
    <div>
      <h1 className="font-bold text-[24px] mb-9 hidden sm:block md:text-left text-center">
        Checkout
      </h1>
      <div className="flex justify-between mb-[132px] md:mb-0">
        <div className="w-full max-w-[1000px] flex flex-col  gap-4 md:w-[65%]">
          {loadAddress && loadCarts ? (
            <AddressCheckoutSkl />
          ) : (
            <CheckoutAddress />
          )}
          <div className="flex flex-col gap-4 md:hidden">
            {loadAddress && loadCarts ? (
              <ShippingCheckoutSkl />
            ) : (
              <ShippingMethod setShipping={setShipping} shipping={shipping} />
            )}
            {loadAddress && loadCarts ? (
              <PaymentCheckoutSkl />
            ) : (
              <PaymentMethod setPaymentMethod={setPaymentMethod} />
            )}
          </div>
          {loadAddress && loadCarts ? (
            <ProductCheckoutSkl />
          ) : (
            <div className="shadow-md p-4 rounded-xl bg-base-100">
              <h2 className="w-full font-bold text-[18px] pb-2 border-b-2 border-[#D5D7DD]">
                Product
              </h2>
              {carts?.map((value, index) => {
                if (value?.is_check) {
                  return (
                    <div
                      key={value?.id}
                      className={`flex gap-2 py-2 ${
                        carts?.length - 1 === index
                          ? ''
                          : 'border-b-2 border-[#D5D7DD]'
                      }`}
                    >
                      <img
                        className="h-20 w-20"
                        src={
                          value?.prescription_image ||
                          value?.product?.product_images[0]?.image
                            ? `
                            ${process.env.REACT_APP_API_BASE_URL}/${
                              value?.prescription_image ||
                              value?.product?.product_images[0]?.image
                            }`
                            : Logo
                        }
                        alt={'Product'}
                      />

                      <div>
                        <p>{value?.product?.name}</p>
                        <p>{value?.qty} Item</p>
                        <p>Rp.{value?.product?.price.toLocaleString(['id'])}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div
          className={`w-full bottom-0 fixed md:sticky md:top-0 md:bottom-[15vh] lg:top-[0px] md:w-[30%]  h-fit  md:right-12 flex flex-col gap-2 z-10 ${
            !loadCarts && totalCart === 0 ? 'hidden' : ''
          }`}
        >
          <div className="hidden md:flex md:flex-col md:gap-2">
            {loadAddress && loadCarts ? (
              <ShippingCheckoutSkl />
            ) : (
              <ShippingMethod setShipping={setShipping} shipping={shipping} />
            )}
            {loadAddress && loadCarts ? (
              <PaymentCheckoutSkl />
            ) : (
              <PaymentMethod setPaymentMethod={setPaymentMethod} />
            )}
          </div>
          <div className="card card-compact shadow-xl bg-base-100">
            {loadAddress && loadCarts ? (
              <CartSummarySkl />
            ) : (
              <CartSummary
                totalCart={totalCart}
                activeCart={activeCart}
                totalPrice={totalPrice}
                shippingFee={shippingFee}
                onSubmitText={'checkout'}
                onSubmitFunc={async () => {
                  if (!shippingFee)
                    return toast.error('Please choose your shipping courier');
                  if (!paymentMethod)
                    return toast.error('Please choose payment method');

                  // if (
                  const { url, midtransToken } = await dispatch(
                    checkoutTxSlice(
                      {
                        shippingFee,
                        discount: discount + amountPromotion,
                        activeCart,
                        promotionActive,
                        ...shipping,
                        totalPrice,
                        paymentMethod,
                      },
                      navigate,
                    ),
                  );
                  dispatch(
                    newActivePromo(
                      {
                        id: null,
                        amount: 0,
                        minPrice: 0,
                        maxPromo: null,
                        promoDisc: null,
                      },
                      () => {},
                    ),
                  );
                  if (paymentMethod === 'paymentGateway')
                    setTokenMidtrans(midtransToken);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
