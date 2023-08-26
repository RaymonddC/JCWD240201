import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CiDiscount1 } from 'react-icons/ci';
import { AiOutlineRight } from 'react-icons/ai';
import toast from 'react-hot-toast';
import PromotionModal from './PromotionModal';

const CartSummary = (props) => {
  const { discount, amountPromotion } = useSelector((state) => state?.cart);

  const [openPromotionModal, setOpenPromotionModal] = useState(false);

  return (
    <div
      className={`card card-compact w-full bottom-0 fixed md:sticky md:top-0 md:bottom-[15vh] lg:top-[11em] md:w-[30%] bg-base-100 shadow-xl h-fit  md:right-12  ${
        props.totalCart === 0 ? 'hidden' : ''
      }`}
    >
      <div className="card-body">
        <label
          htmlFor="my_modal_6"
          onClick={() => {
            props.activeCart === 0
              ? toast.error('Select Your Cart')
              : setOpenPromotionModal(true);
          }}
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
                Total Price <br /> ({props.activeCart} item(s))
              </p>
              <span>Rp{props.totalPrice.toLocaleString(['id'])}</span>
            </div>
            {props.onSubmitText === 'checkout' ? (
              <div className="detailPrice flex justify-between text-[16px]">
                <p>Shipping Fee</p>
                <span>Rp{props.shippingFee?.toLocaleString(['id'])}</span>
              </div>
            ) : (
              ''
            )}
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
              {(
                props.totalPrice +
                (props?.shippingFee || 0) -
                discount -
                amountPromotion
              ).toLocaleString(['id'])}
            </span>
          </div>
          <div className="orderNow  md:pt-5" onClick={props.onSubmitFunc}>
            <button
              className="btn btn-sm md:btn-md  btn-primary w-full text-white"
              disabled={!props.activeCart}
            >
              {props.onSubmitText} ({props.activeCart})
            </button>
          </div>
        </div>
      </div>
      {openPromotionModal ? (
        <PromotionModal
          totalPrice={props.totalPrice}
          openPromotionModal={openPromotionModal}
          closeModal={() => setOpenPromotionModal(false)}
        />
      ) : null}
    </div>
  );
};

export default CartSummary;
