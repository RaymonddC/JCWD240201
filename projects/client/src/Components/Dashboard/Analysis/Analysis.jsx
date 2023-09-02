import React, { useEffect } from 'react';
import { AnalyzeCard } from './AnalyzeCard';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesReportSlice } from '../../../Features/SalesReport/SalesReportSlice';
import { getDashboardDataSlice } from '../../../Features/Dashboard/DashboardSlice';

export const Analysis = (props) => {
  const { revenue, totalTransaction, totalUser } = useSelector(
    (state) => state.dashboard,
  );

  return (
    <div>
      <p className="font-bold text-[20px] leading-6">Analisis Produk & Toko</p>
      <p className="text-[14px] leading-5">{moment().format('MMMM Do YYYY')}</p>
      <div className="div flex justify-between my-4">
        <AnalyzeCard
          title="Today's Revenue"
          data={revenue}
          name="today_revenue"
        />
        <AnalyzeCard
          title="Today's Transactions"
          data={totalTransaction}
          name="total_transaction"
        />
        <AnalyzeCard title="Today's User" data={totalUser} name="total_user" />
      </div>
    </div>
  );
};
