import React, { useEffect } from 'react';
import { OrderCard } from './OrderCard';
import { useSelector } from 'react-redux';
import OrderCardSkl from '../../Skeleton/OrderCardSkl';

export const OrderStatus = (props) => {
  const { transactionStatusTotal, loadDashboard } = useSelector(
    (state) => state.dashboard,
  );

  return (
    <div className="penting">
      <p className="font-bold text-[20px] leading-6">Today's important info</p>
      <p className="text-[14px] leading-5">Activities to be followed up</p>
      <div className="div grid grid-cols-3 gap-4 my-4">
        {loadDashboard ? (
          <OrderCardSkl limit={7} />
        ) : (
          transactionStatusTotal.map((value, index) => {
            return (
              <OrderCard title={value.status} total={value.total} key={index} />
            );
          })
        )}
      </div>
    </div>
  );
};
