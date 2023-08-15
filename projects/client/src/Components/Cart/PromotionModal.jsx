import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import PromotionCard from './PromotionCard';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotionsSlice } from '../../Features/Promotion/PromotionSlice';
import { newActivePromo } from '../../Features/Cart/CartSlice';
import { useNavigate } from 'react-router-dom';

const PromotionModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { promotions } = useSelector((state) => state.promotion);
  const { promotionActive, amountPromotion } = useSelector(
    (state) => state.cart,
  );
  const [selectedPromo, setSelectedPromo] = useState({
    id: promotionActive,
    amount: amountPromotion,
  });
  console.log(selectedPromo, promotionActive);

  useEffect(() => {
    dispatch(
      getPromotionsSlice({
        promotionTypeId: 2,
        totalPrice: props.totalPrice,
      }),
    );
  }, []);

  return (
    <div>
      <input
        readOnly
        checked={props.openPromotionModal}
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box p-0 text-sm relative">
          <div className="head flex justify-between pb-2 px-6 pt-6 border-b sticky top-0 bg-white">
            <p className="text-[24px] font-bold">Promotion</p>
            <label
              htmlFor="my_modal_6"
              className="items-center flex"
              onClick={props.closeModal}
            >
              <GrClose size={'24px'} />
            </label>
          </div>
          <div className="promotions  bg-white p-5 flex flex-col gap-3">
            {promotions.map((value) => {
              return (
                <PromotionCard
                  id={selectedPromo.id}
                  promotion={value}
                  setSelectedPromo={setSelectedPromo}
                />
              );
            })}
          </div>
          <div className="totalDiscount sticky bottom-0 flex justify-between bg-white p-3 px-6 ">
            <div className="disc">
              <p>Applied Discount</p>
              <p className="font-bold text-xl">
                Rp{selectedPromo.amount?.toLocaleString(['id'])}
              </p>
            </div>
            <button
              className="btn btn-primary text-white"
              onClick={() =>
                dispatch(newActivePromo(selectedPromo, props.closeModal))
              }
            >
              Apply Promo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
