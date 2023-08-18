import React, { useEffect, useState } from 'react';
import CartCard from '../Components/Cart/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkoutAsync,
  getCartUserAsync,
  updateQtyAsync,
} from '../Features/Cart/CartSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  getProvinceAsync,
  getUserAddressAsync,
} from '../Features/Address/AddressSlice';
import AddressModal from '../Components/Address/addressModal';
import { CiDiscount1 } from 'react-icons/ci';
import { AiOutlineRight } from 'react-icons/ai';
import PromotionModal from '../Components/Cart/PromotionModal';
import { getPromotionsSlice } from '../Features/Promotion/PromotionSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openPromotionModal, setOpenPromotionnModal] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const { address, loadAddress } = useSelector((state) => state.address);
  const {
    carts,
    totalCart,
    totalPrice,
    activeCart,
    discount,
    amountPromotion,
  } = useSelector((state) => state?.cart);
  const [isCheck, setIsCheck] = useState(false);
  // const [isForceCheck, setIsForceCheck] = useState(false);;

  const handleQty = (e, calc, idx, checked) => {
    dispatch(
      updateQtyAsync({
        checked,
        newQty: Number(e?.currentTarget.value),
        calc,
        idx,
        carts,
      }),
    );
  };

  useEffect(() => {
    dispatch(getCartUserAsync());
    dispatch(getUserAddressAsync());
    dispatch(getProvinceAsync());
  }, []);

  useEffect(() => {
    if (activeCart === totalCart && totalCart !== 0) setIsCheck(true);
    else setIsCheck(false);
  }, [carts, isCheck]);

  // console.log(carts);

  return (
    <div className="min-h-[50vh]">
      <p className="font-bold text-[24px] mb-9 hidden sm:block md:text-left text-center ">
        My Cart
      </p>
      <div className="flex justify-between">
        <div
          className={`card card-compact w-[100%] md:w-[65%] bg-base-100 shadow-xl mb-[7em] md:mb-0 max-w-[1000px] ${
            totalCart === 0 ? 'hidden' : ''
          } `}
        >
          <div className="card-body">
            <div className="selectAll flex gap-5 items-center justify-between">
              <input
                type="checkbox"
                className="h-3 w-3"
                onChange={() => {
                  setIsCheck(!isCheck);
                }}
                checked={isCheck}
              />
              <p>Pilih Semua</p>
            </div>
            <div className="div">
              {carts.map((value, idx) => {
                return (
                  <CartCard
                    key={idx}
                    cart={value}
                    check={isCheck}
                    setCheck={setIsCheck}
                    setQty={handleQty}
                    idx={idx}
                    // isForceCheck={isForceCheck}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={`noCart ${totalCart === 0 ? '' : 'hidden'} `}>
          <div className="p">Start Add Product to cart</div>
        </div>
        <div
          className={`card card-compact w-full bottom-0 fixed md:sticky md:top-0 md:bottom-[15vh] lg:top-[11em] md:w-[30%] bg-base-100 shadow-xl h-fit  md:right-12  ${
            totalCart === 0 ? 'hidden' : ''
          }`}
        >
          <div className="card-body">
            {/* <label
              className="promo flex items-center gap-2 hover:cursor-pointer"
              > */}
            <label
              htmlFor="my_modal_6"
              onClick={() => setOpenPromotionnModal(true)}
              className="promo border text-[1em] md:text-[1.5em] flex items-center  justify-between rounded-lg p-4 hover:cursor-pointer"
            >
              <CiDiscount1 size={'1.5em'} />
              <p>Use Your Promo Here</p>
              <AiOutlineRight />
            </label>
            <div className="summary hidden md:block">
              <div className="ringkasan ">
                <p className="md:my-3 text-[1em] md:text-[2em] font-bold leading-7">
                  Order Summary
                </p>
              </div>
              <div className="details py-3 border-b border-[#D5D7DD]">
                <div className="detailPrice flex justify-between text-[16px]">
                  <p>
                    Total Price <br /> ({activeCart} item(s))
                  </p>
                  <span>Rp{totalPrice.toLocaleString(['id'])}</span>
                </div>
                <div className="detailDiscount flex justify-between text-[16px]">
                  <p>Total Discount</p>
                  <span>
                    -Rp{(discount + amountPromotion).toLocaleString(['id'])}
                  </span>
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
                  {(totalPrice - discount - amountPromotion).toLocaleString([
                    'id',
                  ])}
                </span>
              </div>
              <div className="orderNow  md:pt-5">
                <button
                  className="btn btn-sm md:btn-md  btn-primary w-full text-white"
                  onClick={() => {
                    // checkoutAsync();
                    // navigate('/checkout');
                    if (!address.length) return setOpenAddressModal(true);
                    return navigate('/checkout');
                  }}
                >
                  Proceed ({activeCart})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAddressModal ? (
        <AddressModal
          addAddress
          navigate={'/checkout'}
          openAddressModal={openAddressModal}
          closeModal={() => setOpenAddressModal(false)}
        />
      ) : null}
      {openPromotionModal ? (
        <PromotionModal
          totalPrice={totalPrice}
          openPromotionModal={openPromotionModal}
          closeModal={() => setOpenPromotionnModal(false)}
        />
      ) : null}
    </div>
  );
};

export default Cart;
