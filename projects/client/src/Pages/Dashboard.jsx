import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Analysis } from '../Components/Dashboard/Analysis/Analysis';
import { OrderStatus } from '../Components/Dashboard/OrderStatus/OrderStatus';
import {
  getDashboardDataSlice,
  getTotalRevenueSlice,
} from '../Features/Dashboard/DashboardSlice';
import NewChart from '../Components/SalesReport/NewChart';
import AnalyzeCardSkl from '../Components/Skeleton/AnalysisCardSkl';
import ChartSkeleton from '../Components/Skeleton/ChartSkeleton';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useSelector((state) => state?.user);
  const { totalRevenue, loadChart } = useSelector((state) => state.dashboard);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();

  useEffect(() => {
    dispatch(
      getDashboardDataSlice({
        today_date: today,
      }),
    );
    dispatch(getTotalRevenueSlice());
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <Analysis />
      <div className="medicine flex justify-between">
        <OrderStatus />
      </div>
      {loadChart ? (
        <ChartSkeleton limit={1} />
      ) : (
        <div
          onClick={() => navigate('/report')}
          className="w-full rounded-lg shadow-xl p-4 bg-white cursor-pointer"
        >
          <h1 className="ml-[65px] font-bold text-lg mb-4">
            Revenues this month
          </h1>
          <div className="h-[340px]">
            <NewChart
              data={totalRevenue}
              dataKey="today_revenue"
              label="Today Revenue"
            />
          </div>
        </div>
      )}
    </div>
  );
};
