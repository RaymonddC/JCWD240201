import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Analysis } from '../Components/Dashboard/Analysis/Analysis';
import { OrderStatus } from '../Components/Dashboard/OrderStatus/OrderStatus';
import { MedicStatus } from '../Components/Dashboard/MeidicineStatus/MedicStatus';
import { getDashboardDataSlice } from '../Features/Dashboard/DashboardSlice';

export const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);
  const { totalRevenue } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const today = new Date();

  console.log(totalRevenue);

  useEffect(() => {
    dispatch(
      getDashboardDataSlice({
        today_date: today,
      }),
    );
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <Analysis />
      <div className="medicine flex justify-between">
        <OrderStatus />
        {/* <MedicStatus /> */}
      </div>
    </div>
  );
};
