import React from 'react';
import ArrowUp from '../../../utils/images/arrowUp.svg';
import ArrowDown from '../../../utils/images/arrowDown.svg';

export const OrderCard = (props) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body flex flex-row justify-between">
        <div className="div">
          <p>{props.title}</p>
          <p className="card-title">10</p>
        </div>
      </div>
    </div>
  );
};
