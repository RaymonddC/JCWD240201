import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CiDiscount1 } from 'react-icons/ci';
import { AiOutlineRight } from 'react-icons/ai';
import toast from 'react-hot-toast';
import PromotionModal from './PromotionModal';

const CartSummary = (props) => {
  const { discount, amountPromotion, promotionActive } = useSelector(
    (state) => state?.cart,
  );

  const [openPromotionModal, setOpenPromotionModal] = useState(false);

  return (
    <div className="card-body">
      <label
        htmlFor="my_modal_6"
        onClick={() => {
          props.activeCart === 0
            ? toast.error('Select Your Cart')
            : setOpenPromotionModal(true);
        }}
        className={`promo border text-[1rem]  flex items-center  justify-between rounded-lg h-10 py-[.4rem] px-[.5rem] md:py-[.5rem] md:h-12  gap-3 hover:cursor-pointer ${
          promotionActive ? ' border-primary' : ''
        }`}
      >
        <CiDiscount1 size={'1.5em'} />
        {promotionActive ? (
          <div className="w-full py-1">
            <p>Applied Discount</p>
            <p className="font-bold">
              Rp{amountPromotion?.toLocaleString(['id'])}
            </p>
          </div>
        ) : (
          <p className="">Use Your Promo Here</p>
        )}
        <AiOutlineRight />
      </label>
      <div className="summary hidden md:block">
        <div className="ringkasan ">
          <p className="md:my-1 text-[1.2rem]  font-bold leading-7">
            Order Summary
          </p>
        </div>
        <div className="details py-1 border-b border-[#D5D7DD] text-[.9rem]">
          <div className="detailPrice flex justify-between ">
            <p>
              Total Price <br /> ({props.activeCart} item(s))
            </p>
            <span>Rp{props.totalPrice.toLocaleString(['id'])}</span>
          </div>
          {props.onSubmitText === 'checkout' ? (
            <div className="detailPrice flex justify-between">
              <p>Shipping Fee</p>
              <span>Rp{props.shippingFee?.toLocaleString(['id'])}</span>
            </div>
          ) : (
            ''
          )}
          <div className="detailDiscount flex justify-between">
            <p>Total Discount</p>
            <span>
              -Rp{(discount + amountPromotion).toLocaleString(['id'])}
            </span>
          </div>
        </div>
      </div>
      <div className="total flex md:block items-center">
        <div className="lastPrice md:flex flex-grow justify-between  my-1 text-[1.2rem]">
          <p className="md:font-bold text-[1rem] md:text-[1.2rem]">
            Total Price
          </p>
          <span className="font-bold">
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
