import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutAddress from '../Components/Checkout/CheckoutAddress';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCartUserAsync } from '../Features/Cart/CartSlice';
import ShippingMethod from '../Components/Checkout/ShippingMethod';
import { toast } from 'react-hot-toast';
import { checkoutTxSlice } from '../Features/Checkout/CheckoutSlice';

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
  } = useSelector((state) => state?.cart);

  const [shipping, setShipping] = useState({
    courier: null,
    duration: null,
  });

  useEffect(() => {
    dispatch(getCartUserAsync());
  }, []);

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
        <div
          className={`card card-compact w-full bottom-0 fixed md:sticky md:top-0 md:bottom-[15vh] lg:top-[11em] md:w-[30%] bg-base-100 shadow-xl h-fit  md:right-12  ${
            totalCart === 0 ? 'hidden' : ''
          }`}
        >
          <div className="card-body">
            <div className="promo">promo</div>
            <div className="summary hidden md:block">
              <div className="ringkasan ">
                <p className="md:my-3 text-[1em] md:text-[2em] font-bold leading-7">
                  Ringkasan Belanja
                </p>
              </div>
              <div className="details py-3 border-b border-[#D5D7DD]">
                <div className="detailPrice flex justify-between text-[16px]">
                  <p>
                    Total Price <br /> ({activeCart} item(s))
                  </p>
                  <span>Rp{totalPrice.toLocaleString(['id'])}</span>
                </div>
                <div className="detailPrice flex justify-between text-[16px]">
                  <p>Shipping Fee</p>
                  <span>Rp{shippingFee.toLocaleString(['id'])}</span>
                </div>
                <div className="detailDiscount flex justify-between text-[16px]">
                  <p>Total Discount</p>
                  <span>-Rp{discount.toLocaleString(['id'])}</span>
                </div>
              </div>
            </div>
            <div className="total flex md:block items-center">
              <div className="lastPrice md:flex flex-grow justify-between  my-2 ">
                <p className="md:font-bold text-[0.8em] md:text-[1.5em] lg:text-[2em]">
                  Total Price
                </p>
                <span className="font-bold text-[1em] md:text-[1.5em] lg:text-[2em]">
                  Rp
                  {(totalPrice - discount + shippingFee).toLocaleString(['id'])}
                </span>
              </div>
              <div className="orderNow  md:pt-5">
                <button
                  className="btn btn-sm md:btn-md  btn-primary w-full text-white"
                  onClick={async () => {
                    if (!shippingFee)
                      return toast.error('Please choose your shipping courier');

                    // if (
                    dispatch(
                      checkoutTxSlice(
                        {
                          shippingFee,
                          discount,
                          activeCart,
                          promotionActive,
                          ...shipping,
                          totalPrice,
                        },
                        navigate,
                      ),
                    );
                    // )
                    // return navigate('/user/transaction');

                    // Navigate({ to: '/' });
                  }}
                >
                  Checkout ({activeCart})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
