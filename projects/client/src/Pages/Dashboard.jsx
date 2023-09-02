import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Analysis } from '../Components/Dashboard/Analysis/Analysis';
import { OrderStatus } from '../Components/Dashboard/OrderStatus/OrderStatus';
import { getDashboardDataSlice } from '../Features/Dashboard/DashboardSlice';

export const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const today = new Date();

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
      </div>
    </div>
  );
};
