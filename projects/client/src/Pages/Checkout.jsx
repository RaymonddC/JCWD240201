import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutAddress from '../Components/Checkout/CheckoutAddress';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCartUserAsync } from '../Features/Cart/CartSlice';
import ShippingMethod from '../Components/Checkout/ShippingMethod';
import { toast } from 'react-hot-toast';
import { checkoutTxSlice } from '../Features/Checkout/CheckoutSlice';
import { CiDiscount1 } from 'react-icons/ci';
import { AiOutlineRight } from 'react-icons/ai';
import PromotionModal from '../Components/Cart/PromotionModal';
import CartSummary from '../Components/Cart/CartSummary';
import PaymentMethod from '../Components/Checkout/PaymentMethod';
import {
  handleMidtransPaymentSlice,
  handleOnlinePaymentSlice,
  openMidtransSnapSlice,
} from '../Features/Transaction/TransactionSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const { shippingFee } = useSelector((state) => state.checkout);
  const { editAddressData, selectedAddress, cityUser, loadAddress } =
    useSelector((state) => state.address);
  const {
    carts,
    totalCart,
    totalPrice,
    activeCart,
    discount,
    promotionActive,
    amountPromotion,
  } = useSelector((state) => state?.cart);

  const [shipping, setShipping] = useState({
    courier: null,
    duration: null,
  });
  const [paymentMethod, setPaymentMethod] = useState();

  const [tokenMidtrans, setTokenMidtrans] = useState(null);

  useEffect(() => {
    dispatch(getCartUserAsync());
  }, []);

  useEffect(() => {
    console.log(tokenMidtrans, '================>>>>>>>>>>');
    dispatch(openMidtransSnapSlice(tokenMidtrans, navigate));
  }, [tokenMidtrans]);

  if (!token) return <Navigate to="/" />;
  if (totalCart === 0 && loadAddress === false) return <Navigate to="/cart" />;
  // if (!carts.length) return <Navigate to="/cart" />;

  return (
    <div>
      <h1 className="font-bold text-[24px] mb-9 hidden sm:block md:text-left text-center">
        Checkout
      </h1>
      <div className="flex justify-between">
        <div className="w-full max-w-[1000px] flex flex-col gap-4">
          <CheckoutAddress />
          <ShippingMethod setShipping={setShipping} />
          <PaymentMethod setPaymentMethod={setPaymentMethod} />
          <div className="flex flex-col gap-4 shadow-md p-4 rounded-xl">
            {carts?.map((value) => {
              if (value?.is_check) {
                return (
                  <div key={value?.id} className="flex gap-2">
                    <div>
                      <div className="w-[100px] h-[100px] bg-primary"></div>
                    </div>
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
        </div>
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
            console.log(midtransToken);
            if (paymentMethod === 'paymentGateway')
              setTokenMidtrans(midtransToken);
          }}
        />
      </div>
    </div>
  );
}
