import React from 'react';
import ArrowUp from '../../../utils/images/arrowUp.svg';
import ArrowDown from '../../../utils/images/arrowDown.svg';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const OrderCard = (props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/transactions')}
      className="card card-compact bg-base-100 shadow-xl cursor-pointer"
    >
      <div className="card-body flex flex-row justify-between">
        <div className="div">
          <p>{props.title}</p>
          <p className="card-title">{props?.total}</p>
        </div>
      </div>
    </div>
  );
};
