import React from 'react';
import ArrowUp from '../../../utils/images/arrowUp.svg';
import ArrowDown from '../../../utils/images/arrowDown.svg';

export const AnalyzeCard = (props) => {
  return (
    <div className="card card-compact w-[32%] bg-base-100 shadow-xl">
      <div className="card-body flex flex-row justify-between">
        <div className="div">
          <p>{props.title}</p>
          <p className="card-title">
            {props?.name === 'today_revenue'
              ? `Rp. ${props?.data?.[props.name]?.toLocaleString('id-ID')}`
              : props?.data?.[props.name]}
          </p>
          {/* <div className="summary flex gap-1 leading-6 items-center">
            <img className="h-[10px]" src={ArrowDown} alt="" />
            <p className={`text-[#FF6B6B] text-[10px]`}>-5.700.000</p>
          </div> */}
        </div>
        <div className="right">a</div>
      </div>
    </div>
  );
};
