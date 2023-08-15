import React from 'react';
import { GrClose } from 'react-icons/gr';
import PromotionCard from './PromotionCard';

const PromotionModal = (props) => {
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
        <div className="modal-box px-0 pt-0 text-sm relative">
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
            {}
            <PromotionCard />
            <PromotionCard />
            <PromotionCard />
            <PromotionCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
